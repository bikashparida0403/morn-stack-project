import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import {registesellerrFormControls } from "@/config";
import { registerSeller } from "@/store/auth-slice/index2"; // Updated import
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

const initialState = {
  shopName: "",  // Changed from userName
  email: "",
  phone: "",       // Added phone for sellers
  password: "",
  address: "",
};

function SellerRegister() {  // Renamed component
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(registerSeller(formData)).then((data) => {  // Updated function
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
        navigate("/auth/login"); // Updated route
      } else {
        toast({
          title: data?.payload?.message || "Registration failed",
          variant: "destructive",
        });
      }
    });
  }

  console.log(formData);

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Create Seller Account
        </h1>
        <p className="mt-2">
         
        </p>
      </div>
      <CommonForm
        formControls={registesellerrFormControls}
        buttonText={"Sign Up"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default SellerRegister;
