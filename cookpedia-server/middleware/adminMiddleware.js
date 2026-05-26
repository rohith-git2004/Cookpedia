const jwt = require('jsonwebtoken')

const adminMiddlware = async(req,res,next)=>{
    console.log("inside adminMiddlware");
    const token = req.headers['authorization'].split(" ")[1]
    if (token) {
        try{
            const jwtResponse = jwt.verify(token,process.env.JWTSECRET)
            req.role = jwtResponse.role
            req.payload = jwtResponse.email
            if (jwtResponse.role == "admin") {
                next()
            }
            else{
                res.status(401).json("Authorization faild! Permission denied")
            }
        }catch(err){
            res.status(401).json("Authorization faild! Invalid Token")
        }
    }
    else{
        res.status(404).json("Authorization faild! Token missing")
    }
}

module.exports = adminMiddlware