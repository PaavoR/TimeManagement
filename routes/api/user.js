const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult } = require('express-validator/check');
const User = require('../../models/User');


// @route   POST api/user/register
// @desc    Register a new user
// @access  Public
router.post('/register',[
    check('name','Name is required').not().isEmpty(),
    check('email', 'Please include valid email').isEmail(),
    check('password','Please enter password with 6 or more chars').isLength({min:5})
], async (req,res)=> {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    try {
        const {name, email, password} = req.body;
        // See if the user exists
        let user = await User.findOne({email:email});      
        if (user) {
            return res.status(400).json({errors: [{msg: 'User already exist'}]});
        }

        // Encrypt password
        const salt = await bcrypt.genSalt(10);

        const hashpassword = await bcrypt.hash(password,salt);

        user = new User({
            name,
            email, 
            password: hashpassword
        });

        await user.save();

        //Jsonwebtoken
        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, 
            config.get('jwtSecret'),
            { expiresIn: '6h' },
            (err,token)=>{
                if(err) throw err;
                res.json({token});
            });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error!');
    }
});

module.exports = router;