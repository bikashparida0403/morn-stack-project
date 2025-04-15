const mongoose = require("mongoose");

const SellerSchema = new mongoose.Schema(
  {
    userName: { 
        type: String, 
        required: true,
        unique: true
      },// Store name
    email: { 
      type: String, 
      required: true, 
      unique: true
    }, // Seller's email (must be unique)

    password: { 
      type: String, 
      required: true 
    }, // Hashed password for authentication

    phone: { 
      type: String, 
      required: true 
    }, // Contact number

    address: { 
      type: String, 
      required: true 
    }, // Store or home address
    role: {
      type: String,
      default: "admin",
    },
  
  },
  { collection: "users" } // Adds `createdAt` and `updatedAt` automatically
);

module.exports = mongoose.model("Seller", SellerSchema);
