const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const catchAsyncError = require('../middlewares/catchAsyncError');
const sendToken = require('../utils/jwtToken');


//register a new user => /ai/v1/register

exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: 'c',
            url: 'v'
        }
    })

  sendToken(user,200,res)
})

// Login User =>apq/v1/Login
exports.loginUser = catchAsyncError(async (req, res, next)=>{
    const {email, password} = req.body;

    //check if email and password is added by user
    if(!email || !password){
        return next(new ErrorHandler('Please enter email and password',400))
    }

    // Finding user in database 
    const user=await User.findOne({email}).select('+password')

    if(!user){
        return next(new ErrorHandler('Invalid Email or password',401))
    }

    //Checks if password is correct
    const isPasswordMatched =await user.comparePassword(password)

    if(!isPasswordMatched){
        return next(new ErrorHandler('Invalid Password',401))
    }

    sendToken(user,200,res)

})