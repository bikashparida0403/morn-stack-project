import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { CheckCircle } from "lucide-react";

function PaymentSuccessPage() {
  const navigate = useNavigate();

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="p-10 text-center shadow-lg">
        <CardHeader className="p-0 flex flex-col items-center">
          <CheckCircle className="text-green-500 mb-4" size={64} />
          <CardTitle className="text-3xl font-bold">Payment Successful!</CardTitle>
        </CardHeader>
        <Button className="mt-6" onClick={() => navigate("/shop/account")}>
          View Orders
        </Button>
      </Card>
    </div>
  );
}

export default PaymentSuccessPage;

