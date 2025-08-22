const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String, // <-- also corrected this line
  },
  image: {

    type: String,
    required: true,
    default: "https://images.unsplash.com/photo-1755095901325-637deba5b2b5?...",
    set:(v)=> v===""? "https://images.unsplash.com/photo-1755095901325-637deba5b2b5?..." : v,
  },
  price: { type: Number, required: true },
  location: { type: String, required: true },
  country: { type: String, required: true },
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing; // ✅ correct export
