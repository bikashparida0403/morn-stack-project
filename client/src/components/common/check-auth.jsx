import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({isAuthenticated, user, children }) {
  const location = useLocation();

  console.log(location.pathname, isAuthenticated);

  if (location.pathname === "/") {
    if (!isAuthenticated) {    //isAuthenticated
      return <Navigate to="/auth/login" />;
    } else {
      if (user?.role === "admin") {
        return <Navigate to="/admin/dashboard" />;
      } 
      else if (user?.role === "appadmin") {
        return <Navigate to="/appadmin/dashboard" />;
      }
       else {
        return <Navigate to="/shop/home" />;
      }
    }
  }

   if ( !isAuthenticated && !(location.pathname.includes("/login") || location.pathname.includes("/register") )) {
    return <Navigate to="/auth/login" />;
  }  

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } 
    else if (user?.role === "appadmin") {
      return <Navigate to="/appadmin/dashboard" />;
    }
    else {
      return <Navigate to="/shop/home" />;
    }
  }

  // if (
  //   isAuthenticated &&
  //   user?.role !== "admin" &&
  //   location.pathname.includes("admin")
  // ) {
  //   return <Navigate to="/unauth-page" />;
  // }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }
  if (
    isAuthenticated &&
    user?.role === "appadmin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/appadmin/dashboard" />;
  }
  return <>{children}</>;
}

export default CheckAuth;
