import { Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";
import uploadFile from "../../utils/uploadFile";
import axios from "axios";
import { toast } from "sonner";

const SignUp = () => {

  // to manage register data state
  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  //managing image upload state
  const [imageUpload, setImageUpload] = useState("");

  // handling field change when data is entered
  const handleChange = (event) => {
    const { name, value } = event.target;

    setRegisterData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  // this function removes an image from being uploaded state
  const handleRemovePhoto = (event) => {
    event.preventDefault();
    setImageUpload(null);
  };

  // handling file upload
  const handleUpload = async (event) => {

    // taking first image from event
    const file = event.target.files?.[0];

    // function that takes image and upload on cloudinary
    const uploadImage = await uploadFile(file);

    // passing image in useState
    setImageUpload(file);

    console.log(uploadImage, "image");

    setRegisterData((prev) => {
      return {
        ...prev,
        profilePic: uploadImage?.url,
      };
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/register", 
        registerData
      );
      if (response.data.success) {
        toast.success(response?.data?.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error); // Log the error
      toast.error(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-lg">
        <div className="text-center flex flex-col gap-2">
          <Lock className="mx-auto h-12 w-12 text-indigo-600" />
          <h3 className="font-semibold text-base text-indigo-600">
            CHAT LOUNGE
          </h3>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            Welcome, please sign-up to continue
          </h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email name"
                value={registerData?.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                value={registerData?.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                value={registerData?.password}
                onChange={handleChange}
              />
            </div>
          </div>

          <div>
            <label htmlFor="profilePic">
              Profile Picture:
              <div className="h-14 bg-slate-200 flex justify-center items-center border rounded hover:border-primary">
                <p className="text-sm max-w-[300px] text-ellipsis line-clamp-1">
                  {imageUpload?.name || "Upload picture"}
                </p>
                {imageUpload?.name && (
                  <button
                    className="text-lg ml-2 hover:text-red-600"
                    onClick={handleRemovePhoto}
                  >
                    <X />
                  </button>
                )}
              </div>
            </label>
            <input
              type="file"
              id="profilePic"
              name="profilePic"
              className="bg-slate-100 px-2 py-1 focus:outline-none hidden"
              onChange={handleUpload}
            />
          </div>
          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign Up Now
            </button>
          </div>
        </form>
        <p>
          Already a user ?
          <Link to={"/register"} className="text-base text-indigo-600">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
