const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require('method-override')
const ejsMate = require("ejs-mate");






app.use(express.static(path.join(__dirname,"/public")));
app.use(express.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.engine('ejs',ejsMate );

app.set('view engine', 'ejs');
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));

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

//root function
app.get("/", (req, res) => {
  res.send("I am root");
});

// console.log(typeof Listing);
// console.log(Listing);


// app.get("/testListing", async (req, res) => {
//   let sample = new Listing({
//     title: "Lochan ghr",
//     description: "Nahar nera",
//     image:" ",
//     price: 2500,
//     location: "Bhasi",
//     country: "Nepal",
//   });
//   await sample.save();
//   console.log("Sample Saved");
//   res.send("Sample uploaded");
// });


//index route
app.get("/listings",async(req,res)=>{
  const allListing = await Listing.find({});
  res.render("listings/index.ejs",{allListing});
});

//new route
app.get("/listings/new",(req,res)=>{
  res.render("listings/new.ejs");
});



//show routes
app.get("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  const listing = await Listing.findById(id);
  res.render("listings/show.ejs",{listing})

});
// create route
app.post("/listings",async(req,res)=>{
  const newListing = new Listing(req.body.listing);
  await newListing.save();
  res.redirect("/listings");
});



//edit route
app.get("/listings/:id/edit",async(req,res)=>{
   let {id} = req.params;
  const listing = await Listing.findById(id);
   res.render("listings/edit.ejs",{listing})
});

//update
app.put("/listings/:id",async(req,res)=>{
let {id} = req.params;
let updatedListing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
res.redirect(`/listings/${id}`);
});

//delete
app.delete("/listings/:id",async(req,res)=>{
  let {id} = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  res.redirect("/listings");

});

//my server
app.listen(8080, () => {
  console.log("Listening to 8080");
});
