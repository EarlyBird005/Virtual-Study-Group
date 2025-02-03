import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// middleware imports
import { loggerMidddleware } from "./middlewares/loggerMidddleware.js";

// routes imports
import userRoute from "./routes/user.route.js"

export const app = express();

app.use(cors());
/*
app.use(cors({
    origin: (origin, callback) => {
        if (process.env.ORIGINS.split(',').includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    credentials: true
}));
*/
/*
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));
*/

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static("public"));
app.use(cookieParser());

// middlewares
app.use(loggerMidddleware);
app.use("/api/user", userRoute);

// app.get("/test", (req, res) => {
//     res.status(200).json({
//         msg: "Success"
//     });
// })

// error middleware
app.use((err, req, res, next) => {
//     console.log("error middleware:", err);
//     return res.status(err.status || 500).json({ message: err.message, status: err.status || 500 });
    return res.status(err.status || 500).json({ message: err.message, success: err.status < 400 });
});
