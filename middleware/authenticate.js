const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const People = require('../model/schema');
dotenv.config({ path: './config.env' });

const Authenticate = async (req, res,next) => {
    try {
        const cookie = req.cookies['jwt_cookie'];
        console.log(cookie)
        const claims = jwt.verify(token, "djrirmlkroirrrururririroroor");
        
        const rootUser = await People.findOne({ _id: claims._id, "tokens.token" :token });
        if(!rootuser) {throw new Error('User not found')}
        console.log(user)
        res.send(user);
        req.token= token;
        req.rootUser= rootUser;
        req.userID= rootUser._id;

        next();

    } catch (err) {
        res.status(401).send('unautorized user  fffffffffff');
        console.log(err)
    }
}
module.exports = Authenticate;



// process.env.SECRET_KEY