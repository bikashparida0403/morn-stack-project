import { Outlet } from "react-router-dom";
import welcomeImage from "../../assets/OIP.jpg";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
            <img src={welcomeImage} className="hidden lg:flex  bg-black w-1/2" />
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
