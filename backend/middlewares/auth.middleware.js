import { UserModel } from "../models/User.model.js";
import jwt from "jsonwebtoken";

export const authUser = async (req, res, next) => {
    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            // return res.status(401).json({
            //     message: "Unauthorized | cookie not found",
            //     success: "fail"
            // });
            const err = new Error("Unauthorized | cookie not found");
            err.status = 401;
            return next(err);
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRET);

        const user = await UserModel.findById(decoded._id);
        if (!user) {
            // return res.status(401).json({
            //     message: "Unauthorized | token is wrong",
            //     success: "fail"
            // });
            const err = new Error("Unauthorized | invalid cookie token");
            err.status = 401;
            return next(err);
        }

        req.user = user;
        return next();
    } catch (error) {
        error.status = 401;
        error.message = "Unauthorized | token verification failed";
        return next(error);
    }
}

export const authAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        // return res.status(403).json({
        //     message: 'Access denied. Admins only',
        //     success: "fail"
        // });
        const err = new Error("Unauthorized | Access denied. Admins only");
        err.status = 403;
        return next(err);
    }
    next();
}