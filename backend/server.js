import { app } from './app.js';

// connecting to database
import { connectDB } from './data/database.js';
connectDB();

app.listen(process.env.PORT, () => console.log("Server is Running ... "));