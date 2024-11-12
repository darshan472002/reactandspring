import React, { useEffect, useState } from "react";
import Base from "../components/Base";
import base_url from "../services/helper";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const Home = () => {
    const [user, setUser] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [editId, setEditId] = useState(null);
    const [image, setImage] = useState({});
    const [editData, setEditData] = useState({ userName: '', email: '', password: '', imageName: '' });
    const [selectedImage, setSelectedImage] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [error, setError] = useState({
        errors: {},
        isError: false,
    });

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const [pageSize, setPageSize] = useState(4); 

    // Function to fetch paginated user data from server
    const fetchPaginatedUsers = (pageNumber = 0) => {
        axios.get(`${base_url}/api/users?pageNumber=${pageNumber}&pageSize=${pageSize}`)
            .then((response) => {
                setUser(response.data.content);
                setTotalPages(response.data.totalPages);
                setCurrentPage(response.data.pageNumber);
            })
            .catch((error) => {
                toast.error("Error fetching paginated users");
                console.error(error);
            });
    };

    // Function to fetch search results from server
    const getAllUserDataFromServer = () => {
        const url = `${base_url}/api/users/search?keyword=${searchQuery}`;
        axios.get(url)
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                toast.error("Error fetching users");
                console.error(error);
            });
    };

    useEffect(() => {
        if (searchQuery) {
            getAllUserDataFromServer();
        } else {
            fetchPaginatedUsers();
        }
    }, [searchQuery]);


    // Handle page change for pagination
    const handlePageChange = (newPage) => {
        if (searchQuery) {
            getAllUserDataFromServer(); // To keep search results, ignore pagination
        } else {
            fetchPaginatedUsers(newPage);
        }
    };


    // Delete user function
    const deleteUser = (id) => {
        axios.delete(`${base_url}/api/users/${id}`).then((response) => {
            toast.success("User removed Successfully");
            setUser(user.filter((u) => u.id !== id));
            console.log(response.data);
        }).catch((error) => {
            toast.error("User not removed! Server Error");
            console.error(error.data);
        });
    };


    // Update user function
    const updateUserData = (id) => {
        axios.put(`${base_url}/api/users/${id}`, editData)
            .then((response) => {
                if (image) {
                    uploadUpdatedImage(image, response.data.id)
                      .then(() => {
                        toast.success("Image Updated!");
                      })
                      .catch((error) => {
                          toast.error(error.response.data.message);
                      });
                }

                if (!error.isError) {
                    toast.success("User updated successfully");
                    setUser(user.map((u) => (u.id === id ? { ...u, ...editData } : u)));
                    setEditId(null);
                    console.log(response.data);
                }
            })
            .catch((error) => {
                toast.error("User not updated! Server Error");
                console.error(error.response.data);

                if (error.response && error.response.data) {
                    setError({
                      errors: error.response.data,
                      isError: true,
                    });
                }
            });
    };


    // Handle edit button click
    const handleEditClick = (user) => {
        setEditId(user.id);
        setEditData({ userName: user.userName, email: user.email, password: user.password, imageName: user.imageName });
    };

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const uploadUpdatedImage = async (image, id) => {
        let formData = new FormData();
        formData.append("image", image);
    
        const response = await axios
          .put(`${base_url}/api/users/image/update/${id}`, formData);
        return response.data;
    };
    
    // Handling file change event
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
          setImage(file);
          console.log(file);
        }
    };

    // Open the modal with the large image
    const openImageModal = (imageName) => {
        setIsModalOpen(true);

        // Fetch the image as a Blob
        axios.get(`${base_url}/api/users/image/${imageName}`, {
            responseType: 'blob' // This makes sure the response is a Blob
        })
        .then((response) => {
            // Convert Blob to an object URL for the image
            const imageUrl = URL.createObjectURL(response.data);
            setSelectedImage(imageUrl);
        })
        .catch((error) => {
            console.error('Error fetching image:', error);
            // Fallback if there’s an error
            setSelectedImage(null);
        });
    };

    // Close the modal and revoke the object URL to free up memory
    const closeModal = () => {
        setIsModalOpen(false);
        URL.revokeObjectURL(selectedImage); // Revoke the object URL
        setSelectedImage(null);
    };


    // Handle search input change
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <Base>
            <ToastContainer/>
            <h1 className="text-2xl text-center mt-24 font-bold">Fetch the data from API</h1>
            <br />
            <div className="flex justify-center mb-8">
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="bg-gray-200 text-black-300 rounded-md pl-10 pr-72 py-3 text-sm mt-5 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:bg-gray-300"
                    />
                    <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 mt-2.5 text-gray-800" />
                </div>
            </div>
            <div className="flex justify-center">
                <table className="table-auto w-300 border-collapse border border-gray-300 mx-auto">
                    <thead>
                    <tr className="bg-gray-100">
                        <th className="border border-gray-300 p-4 text-left">Username</th>
                        <th className="border border-gray-300 p-4 text-left">Email</th>
                        <th className="border border-gray-300 p-4 text-left">Password</th>
                        <th className="border border-gray-300 p-4 text-left">Images</th>
                        <th className="border border-gray-300 p-4 text-left">Actions</th>
                    </tr>
                    </thead>
                    <tbody>
                    {user && user.length > 0 ? (user.map((u, index) => (
                        <tr key={u.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                            <td className="border border-gray-300 p-4">
                                {editId === u.id ? (
                                    <input
                                        type="text"
                                        name="userName"
                                        value={editData.userName}
                                        onChange={handleInputChange}
                                        className="border p-2"
                                    />
                                ) : (
                                    u.userName
                                )}
                            </td>
                            <td className="border border-gray-300 p-4">
                                {editId === u.id ? (
                                    <input
                                        type="email"
                                        name="email"
                                        value={editData.email}
                                        onChange={handleInputChange}
                                        className="border p-2"
                                    />
                                ) : (
                                    u.email
                                )}
                            </td>
                            <td className="border border-gray-300 p-4">
                                {editId === u.id ? (
                                    <input
                                        type="password"
                                        name="password"
                                        value={editData.password}
                                        onChange={handleInputChange}
                                        className="border p-2"
                                    />
                                ) : (
                                    u.password
                                )}
                            </td>
                            <td className="border border-gray-300 p-4">
                                {editId === u.id ? (
                                    <input
                                        type="file"
                                        name="imageName"
                                        onChange={handleFileChange}
                                        className="border p-2"
                                    />
                                ) : (
                                    <img
                                        src={`${base_url}/api/users/image/${u.imageName}`}
                                        className="h-16 w-16 object-cover rounded cursor-pointer"
                                        alt={`${u.imageName}`}
                                        onClick={() => openImageModal(u.imageName)}
                                    />
                                )}
                            </td>
                            <td className="border border-gray-300 p-4 space-x-2">
                                {editId === u.id ? (
                                    <>
                                        <button
                                            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                            onClick={() => updateUserData(u.id)}
                                        >
                                            Save
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
                                            onClick={() => setEditId(null)}
                                        >
                                            Cancel
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                                            onClick={() => handleEditClick(u)}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                            onClick={() => deleteUser(u.id)}
                                        >
                                            Delete
                                        </button>
                                    </>
                                )}
                            </td>
                        </tr>
                    ))
                        ) : (
                                <tr>
                                    <td colSpan="5" className="text-center p-4">No data available</td>
                                </tr>
                    )}
                    </tbody>
                </table>
                {/* Modal for displaying the large image */}
                {isModalOpen && (
                        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                            <div className="p-4 rounded shadow-lg">
                                <div className="relative bg-white">
                                    <button
                                        onClick={closeModal}
                                        className="absolute top-0 right-3 z-50 text-xl font-bold text-black"
                                    >
                                        X
                                    </button>
                                    <img
                                        src={selectedImage}
                                        alt="Larger View"
                                        className="h-[50vh] w-[24vw] relative"
                                    />
                                </div>
                            </div>
                    </div>
                )}
            </div>

                            

            

            {/* Pagination Controls */}
            {!searchQuery && (
                <nav aria-label="Page navigation" className="text-center">
                    <ul className="inline-flex -space-x-px text-base mt-10">
                        <li>
                            <button
                                disabled={currentPage === 0}
                                onClick={() => handlePageChange(currentPage - 1)}
                                className={`px-4 py-2 border ${currentPage === 0 ? 'bg-gray-300' : 'bg-white hover:bg-gray-200'}`}
                            >
                                Previous
                            </button>
                        </li>

                        {[...Array(totalPages)].map((_, index) => (
                            <li key={index}>
                                <button
                                    onClick={() => handlePageChange(index)}
                                    className={`px-4 py-2 border ${currentPage === index ? 'bg-blue-500 text-white' : 'bg-white hover:bg-gray-200'}`}
                                >
                                    {index + 1}
                                </button>
                            </li>
                        ))}

                        <li>
                            <button
                                disabled={currentPage + 1 === totalPages}
                                onClick={() => handlePageChange(currentPage + 1)}
                                className={`px-4 py-2 border ${currentPage + 1 === totalPages ? 'bg-gray-300' : 'bg-white hover:bg-gray-200'}`}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </nav>
            )}
        </Base>
    );
};

export default Home;
