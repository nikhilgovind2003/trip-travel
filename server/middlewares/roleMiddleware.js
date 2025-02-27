export const isAdmin = (isAdmin) => {
    return (req, res, next) => {
        if (!req.user ||!req.user.isAdmin) {
            res.status(404).json({error: "Access denied"})
        }
        else next()
    }
}