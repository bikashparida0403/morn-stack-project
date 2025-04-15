const Stripe = require("stripe");
const stripe = new Stripe(""); // your secret key
module.exports = stripe;