const userModel = require('../models/user');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // check if all fields are present
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // check if user already exists
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists." })
        }

        // hashed password
        const hashPassword = await bcrypt.hash(password, 10)

        // creatwe new user
        const user = await userModel.create({
            name,
            email,
            password: hashPassword,
        });
        console.log('User saved.', user);
        res.status(201).json({
            message: "User registered Successfully.",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });
    } catch (error) {
        console.log('Registeration Error', error);
        res.status(500).json({message: 'Serevr Error.'})
    }
}

const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;

        // check if all fields are provided
        if(!email || !password) {
            res.status(400).json({message: 'Email and Password are required.'});
        }

        // find user by email
        const user = await userModel.findOne({email});
        if(!user) {
            res.status(401).json({message: 'Invalid email or password'});
        }
        // compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            res.status(401).json({message: 'Invalid email or password'})
        } 

        // If match
        res.status(200).json({
            message: 'Login Successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            },
        });
    } catch (error) {
        console.error('Login Error', error);
        res.status(500).json({message: 'server error during Login'})
    }
}

module.exports = {
    registerUser,
    loginUser,
};