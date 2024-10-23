import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";

const Login = lazy(() => import("./components/Auth/Login"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const RoutingPage = () => {
  return (
    <div>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default RoutingPage;
