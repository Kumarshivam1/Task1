const mongoose = require("mongoose");

const dbConnect = ()=>{
    mongoose.connect("mongodb://127.0.0.1:27017/Task1App").then(console.log("Db Connection Successful"))
.catch((err)=>{
    console,log(err.message);
    //exit with error OR abnormal termination
    process.exit(1);
})
};

module.exports = dbConnect;
