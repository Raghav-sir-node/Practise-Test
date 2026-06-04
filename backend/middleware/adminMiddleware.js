
async function admin(req, resp, next) {
    console.log("admin middleware called", req.user)
    if (req.user && req.user.role == "admin") {
        next() // entry granted as Admin
    }
    else{
        resp.status(403).json({message: "Entry Denied, Only for Admin"})
    }
}
export default admin;