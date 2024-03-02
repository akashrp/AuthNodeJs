const mongoose = require("mongoose");
const MONGO_URL = process.env.MONGO_URL;
const connectDb = () => {
  mongoose.connect(MONGO_URL, {
  }).then(console.log("db Connected")).catch(error=>{
    console.log(error);
    process.exit(1)
  })
};
module.exports=connectDb;