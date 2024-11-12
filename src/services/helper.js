import axios from "axios";

const base_url = 'http://localhost:8080';
export default base_url;

export const myAxios = axios.create({
    baseURL: base_url,
});



// import React, { useEffect, useState } from "react";
// import Base from "../components/Base";
// import base_url from "../services/helper";
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";
// import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// const Home = () => {
//     const [user, setUser] = useState([]); // State to store user data
//     const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
//     const [editId, setEditId] = useState(null); // ID of the user being edited
//     const [image, setImage] = useState({});
//     const [editData, setEditData] = useState({ userName: '', email: '', password: '', imageName: '' });

//     const [error, setError] = useState({
//         errors: {},
//         isError: false,
//     });

//     // Function to fetch all user data or search results from server
//     const getAllUserDataFromServer = () => {
//         const url = searchQuery
//             ? `${base_url}/api/users/search?keyword=${searchQuery}`
//             : `${base_url}/api/users`;
//         axios.get(url)
//             .then((response) => {
//                 if (searchQuery) {
//                     setUser(response.data);
//                     console.log(response.data);
//                 }
//                 else {
//                     setUser(response.data.content);
//                     console.log(response.data.content);                 
//                 }
//             })
//             .catch((error) => {
//                 toast.error("Error fetching users");
//                 console.error(error);
//             });
//     };

//     // Call loading user function once on component mount
//     useEffect(() => {
//         getAllUserDataFromServer();
//     }, [searchQuery]); // Fetch data whenever searchQuery changes

//     // Delete user function
//     const deleteUser = (id) => {
//         axios.delete(`${base_url}/api/users/${id}`).then((response) => {
//             toast.success("User removed Successfully");
//             setUser(user.filter((u) => u.id !== id));
//             console.log(response.data);
//         }).catch((error) => {
//             toast.error("User not removed! Server Error");
//             console.error(error.data);
//         });
//     };

//     // Update user function
//     const updateUserData = (id) => {
//         axios.put(`${base_url}/api/users/${id}`, editData)
//             .then((response) => {
//                 if (image) {
//                     uploadUpdatedImage(image, response.data.id)
//                       .then(() => {
//                         toast.success("Image Updated!");
//                       })
//                       .catch((error) => {
//                           toast.error(error.response.data.message);
//                       });
//                 }

//                 if (!error.isError) {
//                     toast.success("User updated successfully");
//                     setUser(user.map((u) => (u.id === id ? { ...u, ...editData } : u)));
//                     setEditId(null);
//                     console.log(response.data);
//                 }
//             })
//             .catch((error) => {
//                 toast.error("User not updated! Server Error");
//                 console.error(error.response.data);

//                 if (error.response && error.response.data) {
//                     setError({
//                       errors: error.response.data,
//                       isError: true,
//                     });
//                 }
//             });
//     };

//     // Handle edit button click
//     const handleEditClick = (user) => {
//         setEditId(user.id);
//         setEditData({ userName: user.userName, email: user.email, password: user.password, imageName: user.imageName });
//     };

//     // Handle input change
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setEditData((prevData) => ({
//             ...prevData,
//             [name]: value,
//         }));
//     };

//     const uploadUpdatedImage = async (image, id) => {
//         let formData = new FormData();
//         formData.append("image", image);
    
//         const response = await axios
//           .put(`${base_url}/api/users/image/update/${id}`, formData);
//         return response.data;
//     };
    
//     // Handling file change event
//     const handleFileChange = (event) => {
//         const file = event.target.files[0];
//         if (file) {
//           setImage(file);
//           console.log(file);
//         }
//     };

//     // Handle search input change
//     const handleSearchChange = (e) => {
//         setSearchQuery(e.target.value);
//     };

//     return (
//         <Base>
//             <ToastContainer/>
//             <h1 className="text-2xl text-center mt-24 font-bold">Fetch the data from API</h1>
//             <br />
//             <div className="flex justify-center mb-8">
//                 <div className="relative">
//                     <input
//                         type="text"
//                         placeholder="Search..."
//                         value={searchQuery}
//                         onChange={handleSearchChange}
//                         className="bg-gray-200 text-black-300 rounded-md pl-10 pr-72 py-3 text-sm mt-5 placeholder-gray-800 focus:outline-none focus:ring-2 focus:ring-white focus:bg-gray-300"
//                     />
//                     <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 mt-2.5 text-gray-800" />
//                 </div>
//             </div>
//             <div className="flex justify-center">
//                 <table className="table-auto w-300 border-collapse border border-gray-300 mx-auto">
//                     <thead>
//                     <tr className="bg-gray-100">
//                         <th className="border border-gray-300 p-4 text-left">Username</th>
//                         <th className="border border-gray-300 p-4 text-left">Email</th>
//                         <th className="border border-gray-300 p-4 text-left">Password</th>
//                         <th className="border border-gray-300 p-4 text-left">Images</th>
//                         <th className="border border-gray-300 p-4 text-left">Actions</th>
//                     </tr>
//                     </thead>
//                     <tbody>
//                     {user && user.length > 0 ? (user.map((u, index) => (
//                         <tr key={u.id} className={`${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
//                             <td className="border border-gray-300 p-4">
//                                 {editId === u.id ? (
//                                     <input
//                                         type="text"
//                                         name="userName"
//                                         value={editData.userName}
//                                         onChange={handleInputChange}
//                                         className="border p-2"
//                                     />
//                                 ) : (
//                                     u.userName
//                                 )}
//                             </td>
//                             <td className="border border-gray-300 p-4">
//                                 {editId === u.id ? (
//                                     <input
//                                         type="email"
//                                         name="email"
//                                         value={editData.email}
//                                         onChange={handleInputChange}
//                                         className="border p-2"
//                                     />
//                                 ) : (
//                                     u.email
//                                 )}
//                             </td>
//                             <td className="border border-gray-300 p-4">
//                                 {editId === u.id ? (
//                                     <input
//                                         type="password"
//                                         name="password"
//                                         value={editData.password}
//                                         onChange={handleInputChange}
//                                         className="border p-2"
//                                     />
//                                 ) : (
//                                     u.password
//                                 )}
//                             </td>
//                             <td className="border border-gray-300 p-4">
//                                 {editId === u.id ? (
//                                     <input
//                                         type="file"
//                                         name="imageName"
//                                         onChange={handleFileChange}
//                                         className="border p-2"
//                                     />
//                                 ) : (
//                                     <img
//                                         src={`${base_url}/api/users/image/${u.imageName}`}
//                                         className="h-16 w-16 object-cover rounded"
//                                         alt={`${u.imageName}`}
//                                     />
//                                 )}
//                             </td>
//                             <td className="border border-gray-300 p-4 space-x-2">
//                                 {editId === u.id ? (
//                                     <>
//                                         <button
//                                             className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
//                                             onClick={() => updateUserData(u.id)}
//                                         >
//                                             Save
//                                         </button>
//                                         <button
//                                             className="px-3 py-1 bg-gray-500 text-white rounded hover:bg-gray-600"
//                                             onClick={() => setEditId(null)}
//                                         >
//                                             Cancel
//                                         </button>
//                                     </>
//                                 ) : (
//                                     <>
//                                         <button
//                                             className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
//                                             onClick={() => handleEditClick(u)}
//                                         >
//                                             Update
//                                         </button>
//                                         <button
//                                             className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
//                                             onClick={() => deleteUser(u.id)}
//                                         >
//                                             Delete
//                                         </button>
//                                     </>
//                                 )}
//                             </td>
//                         </tr>
//                     ))
//                         ) : (
//                                 <tr>
//                                     <td colSpan="5" className="text-center p-4">No data available</td>
//                                 </tr>
//                     )}
//                     </tbody>
//                 </table>
//             </div>

//             <nav aria-label="Page navigation example" className="text-center">
//                 <ul className="inline-flex -space-x-px text-base mt-10">
//                     <li>
//                         <a href="#" className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 dark:bg-gray-200 dark:border-gray-400 dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black">
//                             <svg className="w-3.5 h-3.5 me-2 rtl:rotate-180 mt-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                 <path stroke="currentColor" Stroke-Linecap="round" Stroke-Linejoin="round" stroke-width="2" d="M13 5H1m0 0 4 4M1 5l4-4" />
//                             </svg>
//                             Previous
//                         </a>
//                     </li>
//                     <li>
//                         <a className="flex items-center justify-center px-4 h-10 leading-tight text-black-300 bg-white border border-gray-300 hover:bg-gray-100 dark:bg-gray-200 dark:border-gray-400 dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black">1</a>
//                     </li>
//                     <li>
//                         <a href="#" className="flex items-center justify-center px-4 h-10 leading-tight text-black-300 bg-gray-200 border border-gray-400 rounded-e-lg hover:bg-gray-100 dark:bg-gray-200 dark:border-gray-400 dark:text-gray-700 dark:hover:bg-gray-300 dark:hover:text-black">
//                             Next
//                             <svg className={"w-3.5 h-3.5 ms-2 rtl:rotate-180 mt-1"} aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
//                                 <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
//                             </svg>
//                         </a>
//                     </li>
//                 </ul>
//             </nav>
//         </Base>
//     );
// };

// export default Home;
