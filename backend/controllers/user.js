
import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendToken } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllUser = async(req, res) => {

};


export const login = async (req, res, next) => {

    try {
        
        const {email, password} = req.body;

        const user = await User.findOne({ email }).select("+password");

        if(!user) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Invalid Email or Password"
            // });

            return next(new ErrorHandler("Invalid Email or Password", 400));
        };

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) {
            // return res.status(404).json({
            //     success: false,
            //     message: "Invalid Email or Password"
            // });

            return next(new ErrorHandler("Invalid Email or Password", 404));
        }

        sendToken(user, res, `Welcome back, ${user.name}`, 200);

    } catch (error) {
        next(error);
    }

};

export const logout = (req, res) => {
    try {

        res
        .status(200)
        .cookie("token", "", {
            expire: new Date(Date.now()),
            sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
            secure: process.env.NODE_ENV === "Development" ? false : true,
        })
        .json({
            success: true,
            message: "Logout Successfull!"
        })

    }catch(error){
        next(error);
    }
}


export const register = async (req, res, next) => {
    
    try {
        
        const { name, email, password } = req.body;

        let user = await User.findOne({email});

        if(user) {
            // return res.status(404).json({
            //     success: false,
            //     message: "User Already Exist"
            // });

            return next(new ErrorHandler("User Already Exist", 400));
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        sendToken(user, res, "Registered Successfully!", 201);


    } catch (error) {
        next(error);
    }

};

// way 1 : to get profile using cookies 
// export const getByProfile = async(req, res) => {
    
//     const id = "myoid";

//     const { token } = req.cookies;

//     // console.log(token);

//     if(!token){
//         return res.status(404).json({
//             success: false,
//             message: "Login First!!"
//         });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_KEY);

//     const user = await User.findById(decoded._id);

//     res
//     .status(200)
//     .json({
//         success: true,
//         user
//     })

// };


// Way 2: using middleware
export const getByProfile = (req, res) => {

    try {
        
        res
        .status(200)
        .json({
            success: true,
            user: req.user
        })

    } catch (error) {
        next(error);
    }

};