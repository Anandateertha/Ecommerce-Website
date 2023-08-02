var jwt = require('jsonwebtoken');
JWT_SECRET = "anandateerthaRiderwithadrenaline"

const fetchuser = (req, res, next) => {

    const token = req.header('auth-token');
    if (!token) {
        return res.status(400).json({ error: "Please use a valid Auth Token" })
    }

    try {
        const data = jwt.verify(token, JWT_SECRET)
        req.user = data.user
        // console.log(req.user.id)
        next()
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

}

module.exports=fetchuser

