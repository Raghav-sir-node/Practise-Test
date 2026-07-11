import jwt from 'jsonwebtoken'
import user from '../model/User.js'
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNTI3YzQ1ZDA0NDEzZmU3MGE4NmVkZCIsImlhdCI6MTc4Mzc5MDY2NCwiZXhwIjoxNzg0Mzk1NDY0fQ.OD1D0JSmO0S7QuZNBvqobi4TRDD1MtNzRl6PL_qqzSs
async function protect(req, resp, next) {
    let token
    console.log(req.headers.authorization)

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token, "chutMaraniKe"); // inside token =header, payload, signature what it does using "chutmara..." it re signs the header, payload with chut..., then matches with the tokens signature
 
        try {
            req.user = await user.findById(decoded.id).select('-password');
            if(!req.user){
                return resp.status(404).json({message: "User Not Found"})
            }
            next()
        }
        catch {
            resp.status(500).json({ message: "Not authorized! Token Failure" });
        }
        
    }
    else {
        resp.status(500).json({ message: "no token found, or Invalid Header" });
    }
}

export default protect;