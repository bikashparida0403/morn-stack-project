import Address from "@/components/shopping-view/address";
import img from "../../assets/account.jpg";
import { useDispatch, useSelector } from "react-redux";
import UserCartItemsContent from "@/components/shopping-view/cart-items-content";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useToast } from "@/components/ui/use-toast";
import { createNewOrder } from "@/store/shop/order-slice";

const stripePromise = loadStripe("");

function ShoppingCheckout() {
  const { cartItems } = useSelector((state) => state.shopCart);
  const { user } = useSelector((state) => state.auth);
  const [currentSelectedAddress, setCurrentSelectedAddress] = useState(null);
  const [isPaymentStart, setIsPaymemntStart] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("stripe");
  const dispatch = useDispatch();
  const { toast } = useToast();

  const totalCartAmount =
    cartItems?.items?.length > 0
      ? cartItems.items.reduce(
          (sum, currentItem) =>
            sum +
            (currentItem?.salePrice > 0
              ? currentItem?.salePrice
              : currentItem?.price) * currentItem?.quantity,
          0
        )
      : 0;

  async function handleCheckout() {
    if (!cartItems?.items?.length) {
      return toast({
        title: "Your cart is empty. Please add items to proceed",
        variant: "destructive",
      });
    }

    if (!currentSelectedAddress) {
      return toast({
        title: "Please select one address to proceed.",
        variant: "destructive",
      });
    }

    setIsPaymemntStart(true);

const isStripe = paymentMethod === "stripe";

const orderData = {
  userId: user?.id,
  cartId: cartItems?._id,
  cartItems: cartItems.items.map((item) => ({
    productId: item?.productId,
    title: item?.title,
    image: item?.image,
    price: item?.salePrice > 0 ? item?.salePrice : item?.price,
    quantity: item?.quantity,
    brand: item?.brand,
  })),
  addressInfo: {
    addressId: currentSelectedAddress?._id,
    address: currentSelectedAddress?.address,
    city: currentSelectedAddress?.city,
    pincode: currentSelectedAddress?.pincode,
    phone: currentSelectedAddress?.phone,
    notes: currentSelectedAddress?.notes,
  },
  orderStatus: isStripe ? "confirmed" : "confirmed", // Stripe needs confirmation after payment
  paymentMethod: paymentMethod,
  paymentStatus: isStripe ? "pending" : "unpaid", // unpaid for COD
  totalAmount: totalCartAmount,
  orderDate: new Date(),
  orderUpdateDate: new Date(),
  paymentId: "",   // Stripe will fill this after success
  payerId: "",     // Same as above
};

    try {
      const result = await dispatch(createNewOrder(orderData)).unwrap();

      if (paymentMethod === "cod") {
        toast({ title: "Order placed with Cash on Delivery!", variant: "default" });
        window.location.href = "/shop/payment-success";
      } else if (paymentMethod === "stripe" && result?.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: result.sessionId });
      } else {
        toast({ title: "Failed to initiate checkout", variant: "destructive" });
      }
    } catch (err) {
      console.error(err);
      toast({ title: "Checkout error occurred", variant: "destructive" });
    }

    setIsPaymemntStart(false);
  }

  return (
    <div className="flex flex-col">
      <div className="relative h-[300px] w-full overflow-hidden">
        <img src={img} className="h-full w-full object-cover object-center" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5 p-5">
        <Address
          selectedId={currentSelectedAddress}
          setCurrentSelectedAddress={setCurrentSelectedAddress}
        />
        <div className="flex flex-col gap-4">
          {cartItems?.items?.map((item) => (
            <UserCartItemsContent key={item._id} cartItem={item} />
          ))}

          <div className="space-y-4 mt-4">
            <div className="font-semibold">Select Payment Method</div>
            <div className="flex flex-col gap-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="stripe"
                  checked={paymentMethod === "stripe"}
                  onChange={() => setPaymentMethod("stripe")}
                />
                Stripe
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery
              </label>
            </div>
          </div>

          <div className="mt-8 space-y-4">
            <div className="flex justify-between">
              <span className="font-bold">Total</span>
              <span className="font-bold">${totalCartAmount}</span>
            </div>
          </div>
          <div className="mt-4 w-full">
            <Button onClick={handleCheckout} className="w-full">
              {isPaymentStart
                ? "Processing Payment..."
                : `Checkout with ${paymentMethod === "stripe" ? "Stripe" : "Cash on Delivery"}`}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShoppingCheckout;
