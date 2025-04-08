import jwt from "jsonwebtoken"

export const jwtToken = (req, res, next) => {
    const token = req.header('Authorization').split(" ")[1] || req.header('authorization').split(" ")[1]
    if (!token) {
        return res.status(401).json({
            success: true,
            message: "Authorization denied"
        })
    }
    
    try {
        const decode = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decode
        next();
    } catch (error) {
        res.status(401).json({
            message: "token is not valid"
        })
    }
}