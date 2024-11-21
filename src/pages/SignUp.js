import { useState } from "react";
import Base from "../components/Base";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import base_url from "../services/helper";
import OpenedEye from "../SVGs/OpenedEye.svg";
import ClosedEye from "../SVGs/ClosedEye.svg";

export default function SignUp() {
  const [user, setUser] = useState({});
  const [image, setImage] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const [error, setError] = useState({
    errors: {},
    isError: false,
  });

  // Form handler function
  const handleForm = (e) => {
    e.preventDefault();
    postDatatoServer(user);
  };

  // Creating function to post data on server
  // const postDatatoServer = (data) => {
  //   axios
  //     .post(`${base_url}/api/v1/auth/register`, data)
  //     .then((response) => {
  //       toast.success("User Registered Successfully! User ID: " + response.data.id);
  //       if (image) {
  //         uploadPostImage(image, response.data.id)
  //           .then(() => {
  //             toast.success("Image Uploaded!");
  //           })
  //           .catch((error) => {
  //             toast.error("Error in Uploading Image !! ");
  //             console.error(error);
  //             // console.log(error.response.data);
  //           });
  //       }

  //       if (!error.isError) {
          
  //         console.log(response);
  //         console.log("success log")
  //         setUser({});
  //         setImage({});
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error! Something went wrong");
  //       console.log(error);

  //       if (error.response && error.response.data) {
  //         setError({
  //           errors: error.response.data,
  //           isError: true,
  //         });
  //       }
  //     });
  // };

  const postDatatoServer = async (data) => {
    try {
      const response = await axios.post(`${base_url}/api/v1/auth/register`, data);
      toast.success("User Registered Successfully! User ID: " + response.data.id);
  
      if (image) {
        try {
          await uploadPostImage(image, response.data.id);
          toast.success("Image Uploaded Successfully!");
        } catch (imageUploadError) {
          toast.error("Error in Uploading Image!");
          console.error(imageUploadError);
        }
      }
  
      setUser({});
      setImage({});
      setError({ errors: {}, isError: false });
    } catch (registrationError) {
      console.error("Error during registration:", registrationError);
      if (registrationError.response && registrationError.response.data) {
        setError({
          errors: registrationError.response.data,
          isError: true,
        });
      }
    }
  };
  

  const uploadPostImage = async (image, id) => {
    let formData = new FormData();
    formData.append("image", image);

    const response = await axios
      .post(`${base_url}/api/v1/users/image/${id}`, formData);
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

  return (
    <Base>
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <ToastContainer />
        <div className="container mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <h1 className="mt-10 mb-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
            SIGNUP
          </h1>
          <form onSubmit={handleForm} className="space-y-6">
            {/* UserName Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
              <div className="mt-2">
                <input
                  id="name"
                  name="name"
                  type="text"
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  value={user.name || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  placeholder="Enter your User Name"
                />
                {error.errors?.name && (
                  <p className="mt-2 text-sm text-red-600">{error.errors.name}</p>
                )}
              </div>
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                Email Address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  value={user.email || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  placeholder="Enter your Email Id"
                />
                {error.errors?.email && (
                  <p className="mt-2 text-sm text-red-600">{error.errors.email}</p>
                )}
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2 relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  value={user.password || ""}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 pr-10"
                  placeholder="Enter your Secure Password"
                />
                {/* Eye Icon */}
                <img src={showPassword ? OpenedEye : ClosedEye} alt="" srcset="" onClick={() => setShowPassword(!showPassword)} className="absolute h-6 right-2 top-2 cursor-pointer flex items-center px-3 transition-transform transform hover:scale-110 active:scale-90 inset-y-0" />
                
                {error.errors?.password && (
                  <p className="mt-2 text-sm text-red-600">{error.errors.password}</p>
                )}
              </div>
            </div>


            {/* File Upload Field */}
            <div>
              <label className="block mb-2 text-sm font-medium leading-6 text-gray-900" htmlFor="file_input">
                Upload file
              </label>
              <input
                className="block w-full text-md border border-gray-900 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-500 focus:outline-none dark:border-gray-600"
                id="file_input"
                type="file"
                onChange={handleFileChange}
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-700" id="file_input_help">
                PNG, JPG (MAX SIZE: 2mb).
              </p>
              {error.errors?.imageName && (
                  <p className="mt-2 text-sm text-red-600">{error.errors.imageName}</p>
                )}
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                SignUp
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm text-gray-500">
            You're a member?{' '}
            <a href="/login" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
              LogIn
            </a>
          </p>
        </div>
      </div>
    </Base>
  );
}
