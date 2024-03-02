const jwt= require('jsonwebtoken');
const SECRET=process.env.SECRET
const auth=(req,res,next)=>
{
    try {
        const token= req.cookies.token;
        if(!token)
        {
            res.status(403).send("unauthorized");
        }
        const decode= jwt.verify(token,SECRET)
        if(!decode)
        {
            res.status(400).send("invalid token")
        }
        console.log(decode)
        req.user=decode;
        next();
    } catch (error) {
        res.status(400).send("invalid token")

    }
}
module.exports=auth