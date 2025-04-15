 const stripe = require("stripe")("sk_test_51OTjRXSIxqi220Sy6VDFwgMnjylgB4L5ald2Hqg0gHRleFPrHTOKbbqreQOnjLtkT1cf9PAgizaLweCLmSDIJ1md00DSRgSEgJ"); // Your secret key
const Order = require("../../models/Order");
const Cart = require("../../models/Cart");
const Product = require("../../models/Product");


console.log(stripe);  // Check that stripe is correctly initialized

const createOrder = async (req, res) => {
  console.log('Creating order...'); // Log the start of order creation
  try {
    const {
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
    } = req.body;

    console.log('Received order data:', req.body);  // Log the incoming request body

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: cartItems.map((item) => ({
        price_data: {
          currency: "inr",
          product_data: {
            name: item.title,
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity,
      })),
      success_url: `http://localhost:5173/shop/payment-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `http://localhost:5173/shop/payment-cancel`,
    });

    console.log('Stripe session created:', session); // Log the session data for debugging

    const newOrder = new Order({
      userId,
      cartItems,
      addressInfo,
      orderStatus,
      paymentMethod,
      paymentStatus,
      totalAmount,
      orderDate,
      orderUpdateDate,
      cartId,
      paymentId: session.id,
    });

    let orders = await newOrder.save();
    for (let item of orders.cartItems) {
      let product = await Product.findById(item.productId);

      product.totalStock -= item.quantity;

      await product.save();
    }

    console.log('Order saved to database:', newOrder); // Log the order save confirmation
    

    res.status(201).json({
      success: true,
      sessionId: session.id,
      orderId: newOrder._id,
      url: session.url, // Redirect user to this
    });
  } catch (e) {
    console.error('Error creating order:', e); // Log detailed error
    res.status(500).json({
      success: false,
      message: "Something went wrong during order creation.",
    });
  }
};

const capturePayment = async (req, res) => {
  try {
    const { paymentId, payerId, orderId } = req.body;

    let order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order can not be found",
      });
    }

    order.paymentStatus = "paid";
    order.orderStatus = "confirmed";
    order.paymentId = paymentId;
    order.payerId = payerId;

    for (let item of order.cartItems) {
      let product = await Product.findById(item.productId);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: `Not enough stock for this product ${product.title}`,
        });
      }

      product.totalStock -= item.quantity;

      await product.save();
    }

    const getCartId = order.cartId;
    await Cart.findByIdAndDelete(getCartId);

    await order.save();

    res.status(200).json({
      success: true,
      message: "Order confirmed",
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getAllOrdersByUser = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({ userId });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found!",
      });
    }

    res.status(200).json({
      success: true,
      data: orders,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

const getOrderDetails = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found!",
      });
    }

    res.status(200).json({
      success: true,
      data: order,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({
      success: false,
      message: "Some error occured!",
    });
  }
};

module.exports = {
  createOrder,
  capturePayment,
  getAllOrdersByUser,
  getOrderDetails,
};
