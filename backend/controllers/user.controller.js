import { UserModel } from "../models/User.model.js"

export const userRegister = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({
            msg: "All fileds are required",
            success: "fail"
        });
    }

    const userExist = await UserModel.findOne({
        $or: [
            { email },
            { username }
        ]
    });
    if (userExist) {
        return res.status(400).json({
            msg: `${email || username} already registered`,
            success: "fail"
        });
    }

    // const hashPassword = await UserModel.hashPassword(password);
    const userCreated = await UserModel.create({
        username,
        email,
        password
    });

    if (!userCreated) {
        return res.status(500).json({
            msg: "Can not create new user right now",
            success: "fail"
        });
    }

    const user = await UserModel.findOne({ email });
    return res.status(200).json({
        msg: "Registered successfully",
        user
    });
}

export const userLogin = async (req, res) => {
    if (req.cookies.token) {
        return res.status(400).json({
            msg: "Already logeed in | cookie stored",
            success: "fail"
        });
    }

    const { username, email, password } = req.body;
    console.log("data:", JSON.stringify(req.body));
    // if (!email || !password) {
    //     return res.status(400).json({
    //         msg: "All fields are required",
    //         success: "fail"
    //     });
    // }

    const user = await UserModel.findOne({
        $or: [
            { email },
            { username }
        ]
    }).select("+password");
    if (!user) {
        return res.status(400).json({
            msg: "Invalid email",
            success: "fail"
        });
    }

    // const passMatched = await user.passCheck(password);
    // user.comp
    // console.log("passMatched:", passMatched);
    // if (!passMatched) {
    //     return res.status(400).json({
    //         msg: "Password is incorrect",
    //         success: "fail"
    //     });
    // }

    const token = "wohooo";
    // const token = user.generateAuthToken();
    // console.log("token ", token);
    res.cookie("token", token);
    // res.cookie("token", token, {
    //     httpOnly: true,
    //     secure: false, // Set to true for HTTPS
    //     maxAge: 60 * 60 * 1000 // 1h
    // });
    /* 
    header cookie set: 
    Authorization -> bearer COOKIE_VAL 
    */

    return res.status(200).json({
        msg: "Login successfully",
        token
    });
}

// export const userLogout = (req, res) => {
//     // const cookie = req.cookies.token || req.headers.authorization?.split(" ")[1];
//     const cookie = req.cookies.token;
//     if (!cookie) {
//         return res.status(401).json({
//             msg: "Cookie not found",
//             success: "fail"
//         });
//     }

//     res.clearCookie("token");
//     return res.status(200).json({
//         msg: "Logged out successfully",
//         success: "true"
//     });
// }

// export const userAccDlt = async (req, res) => {
//     const user = await UserModel.deleteOne(req.user._id);

//     res.clearCookie("token");
//     return res.status(200).json({
//         msg: "user acc deleted",
//         success: "true"
//     });
// }

// export const getUserDetail = async (req, res) => {
//     return res.status(200).json({
//         user: req.user
//     });
// }

// export const updateUserData = async (req, res) => {
//     try {
//         const updatedUser = await UserModel.findByIdAndUpdate(req.user._id, req.body, { new: true, runValidators: true });
//         if (!updatedUser) {
//             return res.status(400).json({
//                 msg: "Failed to update data",
//                 success: "fail"
//             });
//         }

//         return res.status(200).json({
//             msg: "Data updated successfully",
//             updatedUser
//         });
//     } catch (error) {
//         console.log("An error occurred while updating user data:", error);
//         return res.status(400).json({
//             msg: "An error occurred while user updating data",
//             error: error.message
//         });
//     }
// }

// export const getAllUserDetail = async (req, res) => {
//     const allUser = await UserModel.find({});
//     if (!allUser) {
//         return res.status(500).json({
//             msg: "Failed to get all users details",
//             success: "fail"
//         });
//     }

//     return res.status(200).json({ allUser })
// }