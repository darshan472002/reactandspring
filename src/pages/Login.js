// import { useState } from "react";
import { useState } from "react";
import Base from "../components/Base";
import { toast, ToastContainer } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import OpenedEye from "../SVGs/OpenedEye.svg";
import ClosedEye from "../SVGs/ClosedEye.svg";

export default function Login() {

  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [loginDetail, setLoginDetail] = useState({
    username: '',
    password: ''
  });

  const handleChange = (event, field) => {
    
    let actualValue = event.target.value
    setLoginDetail({
      ...loginDetail,
      [field]:actualValue
    })
  }

  const handleReset = () => {
    setLoginDetail({
      username: "",
      password: ""
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    console.log(loginDetail);
    // handleReset();

    // Validation
    if (loginDetail.username.trim() == '' || loginDetail.password.trim() == '') {
      toast.error("Username or Password is required !!")
      return;
    }

    // Submit the data to server to generate token
    loginUser(loginDetail).then((data) => {
      console.log(data);
      toast.success("Logged in Successfully 👍😀");

      // save the data to localstorage
      doLogin(data, () => {
        console.log("Login detail is saved to localstorage")
        // redirect to user dashboard page
        navigate("/user/dashboard");
      })
      

    }).catch(error => {
      console.log(error);
      if (error.response.status === 400 || error.response.status === 404) {
        toast.error(error.response.data.message + "👎😔");
      } else {
        toast.error("Something went wrong on server 👎😔");
      }
    })

  }



    return (
      <Base>
        <ToastContainer/>
      <>
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 mt-20">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 className="mt-10 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
              LOGIN
            </h1>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
              <form onSubmit={handleFormSubmit}  className="space-y-6">
              
              
              {/* Email field */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                    placeholder="Enter your Registered Email ID"
                    value={loginDetail.username}
                    onChange={(e) => handleChange(e, 'username')}
                  />
                </div>
              </div>
  
  
                {/* Password field */}
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                    Password
                  </label>
                  <div className="text-sm">
                    <a href="#" className="font-semibold text-indigo-600 hover:text-indigo-500">
                      Forgot password?
                    </a>
                  </div>
                </div>
                <div className="mt-2 relative">
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3 "
                    placeholder="Enter your Registered Password..."
                    value={loginDetail.password}
                    onChange={(e) => handleChange(e, 'password')}
                  />
                  
                  {/* Eye Icon */}
                  <img src={showPassword ? OpenedEye : ClosedEye} onClick={() => setShowPassword(!showPassword)} className="absolute h-6 right-2 top-2 cursor-pointer z-[999] flex items-center px-3 transition-transform transform hover:scale-110 active:scale-90 inset-y-0" />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  LogIn
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-gray-500">
              You are Not a member?{' '}
              <a href="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                SignUp
              </a>
            </p>
          </div>
        </div>
      </>
      </Base>
    )
  }
  