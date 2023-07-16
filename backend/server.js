import { app } from './app.js';

// connecting to database
import { connectDB } from './data/database.js';
connectDB();

app.listen(process.env.PORT, () => console.log(`Server is Running on ${process.env.PORT} in ${process.env.NODE_ENV} Mode `));