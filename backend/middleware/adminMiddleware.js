
async function admin(req, resp, next) {

    if (req.user && req.user.role == "admin") {
        next() // entry granted as Admin
    }
    else{
        resp.status(403).json({message: "Entry Denied, Only for Admin"})
    }
}
export default admin;