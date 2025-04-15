import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { capturePayment } from "@/store/shop/order-slice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

function StripeReturnPage() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const sessionId = params.get("session_id"); // Stripe session_id

  useEffect(() => {
    if (sessionId) {
      const orderId = sessionStorage.getItem("currentOrderId");

      if (!orderId) {
        navigate("/shop/payment-failed");
        return;
      }

      dispatch(capturePayment({ sessionId, orderId: JSON.parse(orderId) }))
        .then((data) => {
          sessionStorage.removeItem("currentOrderId");

          if (data?.payload?.success) {
            navigate("/shop/payment-success");
          } else {
            navigate("/shop/payment-failed");
          }
        })
        .catch(() => {
          navigate("/shop/payment-failed");
        });
    }
  }, [sessionId, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <Card className="p-8 text-center shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold">
            Confirming your Stripe payment...
          </CardTitle>
        </CardHeader>
      </Card>
    </div>
  );
}

export default StripeReturnPage;
