const mongoose = require("mongoose");
const initData = require("./data.js");

const Listing = require("../models/listing.js");

//Starting db
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/wanderlust");
}

//MAin function for db connection
main()
  .then(() => {
    console.log("connected to db");
  })
  .catch((e) => {
    console.log("Error on connection to db ", e);
  });

const initDb = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data was initData");

};

initDb();

