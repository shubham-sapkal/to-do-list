import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js"

export const newTask = async (req, res, next) => {

    try {
        const { title, description } = req.body;

        console.log(title + " " +description);

        await Task.create({
            title,
            description,
            user: req.user
        });

        res.status(201).json({
            success: true,
            message: "Task added Successfully!!"
        });

        // res.send("connected!!");
    }
    catch(error) {
        next(error);
    }
};

export const getAllTask = async (req, res, next) => {

    try {
        const userid = req.user._id;

        const tasks = await Task.find({
            user: userid
        });

        res.status(200).json({
            success: true,
            tasks
        });

    } catch (error) {
        next(error);
    }

};

export const updateTask = async(req, res, next) => {

    try {
        const { id } = req.params;

        const task = await Task.findById(id);

        if(!task){
            // return res.status(404).json({
            //     success: false,
            //     message: "Task Not Found!!"
            // });
            
            // return next(new Error("Update Error: Task Not Found!!"));
            // return next(new Error());

            // user define error handler
            return next(new ErrorHandler("Update Error: Task Not Found!!", 404));
            // return next(new ErrorHandler());
        
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        res.status(200).json({
            success: true,
            message: "Task Updated!!"
        });
    } catch (error) {
        next(error);
    }

}

export const deleteTask = async(req, res, next) => {

    try {
        
        const { id } = req.params;

        const task = await Task.findById(id);

        if(!task){
            return next(new ErrorHandler("Delete Error: Task Not Found! "));
        }

        await task.deleteOne();

        res.status(200).json({
            success: true,
            message: "Task Deleted!!"
        })

    } catch (error) {
        next(error);
    }

}