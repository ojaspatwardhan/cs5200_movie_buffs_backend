const jwt = require("jsonwebtokens");

module.exports = (req, res, next) => {
    try{
        const token = req.headers.authorization.split(" ")[1];
        const decodedToken = jwt.verify(token, "geralt the wolf witcher");
        req.userData = { email: decodedToken.email, username: decodedToken.username, userId: decodedToken.userId}
        next();
    }catch(error){
        res.status(401).json({ message: "Authentication failed"});
    }
};