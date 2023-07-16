import mongoose from "mongoose";

export const connectDB = () => {
    mongoose
    .connect( process.env.MONGODB_URI, {
        dbName: "todo",
    })
    .then( () => console.log("Database Connected!!") )
    .then( (e) => console.log(e) );
};