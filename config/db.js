import mongoose from "mongoose";
 

function connectToDatabase() {
    mongoose.connect(process.env.MONGO_URI).then(() => {
        console.log("Connected to Database")
    })
}

export default connectToDatabase