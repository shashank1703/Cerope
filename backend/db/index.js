// db/index.js
const mongoose = require("mongoose");
require("dotenv").config();   // CommonJS version

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ MongoDB Connection Error:", err));

// Define schemas
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { 
    type: String, 
    default: '' 
  },
  lastName: { 
    type: String, 
    default: '' 
  },
  dob: { 
    type: Date, 
  },
  stylePreference: { 
    type: String, 
    enum: ['Men', 'Women', 'Both'], // Ensures only these values are accepted 
  },
  phoneNumber: { 
    type: String, 
    default: '' 
  },
  country: { 
    type: String, 
    default: '' 
  },
  city: { 
    type: String, 
    default: '' 
  },
  profilePicture: { 
    type: String, // We will store the URL to the image 
    default: '' 
  },
  // Add a flag to track setup completion 
  profileSetupCompleted: { 
    type: Boolean, 
    default: false 
  }
});


const User = mongoose.model("User", UserSchema);

module.exports = { User };