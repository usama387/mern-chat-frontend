import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import { Toaster } from "sonner";
import ProtectedRoute from "./components/Protected/ProtectedRoute";
import { useLocalStorage } from "@mantine/hooks";
import { SocketProvider } from "./utils/SocketProvider";
const Login = lazy(() => import("./components/Auth/Login"));
const SignUp = lazy(() => import("./components/Auth/SignUp"));
const Home = lazy(() => import("./components/Home"));
const RoutingPage = () => {
  // to get user user details
  const [user] = useLocalStorage({
    key: "userData",
    defaultValue: {},
  });

  return (
    <div>
      <Toaster />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<SignUp />} />

          {/* protected route with socket context */}
          <Route
            element={
              <SocketProvider>
                <ProtectedRoute user={user} />
              </SocketProvider>
            }
          >
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
      </Suspense>
    </div>
  );
};

export default RoutingPage;
