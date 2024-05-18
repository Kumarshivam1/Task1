const User = require("../Model/authScema");
const bcrypt = require("bcrypt");

//Logic for Registration
exports.registerController = async(req,res)=>{
    try{
        const {username,email,phone,password} = req.body;
        //Validation
        if(!username||!email||!password){
            return res.status(400).json({
                success:false,
                message:"Something is Missing",
            })
        }
        //Already Registered
        const ans = await User.findOne({email});
        if(ans){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            });
        }
        //Hashing Password
        const hashedPass = await bcrypt.hash(password,10);
        //Saving in DB
        const response = await User.create({
        username,email,phone,password:hashedPass
    })
    res.status(200).json({
        success:true,
        data:response
    });
    }
    catch(err){
        res.status(400).json({
            success:false,
            message:"Error while registering",
            data:err.message
        });
    }  
}

//Logic for login functionality
exports.loginController = async(req,res)=>{
    try{
    const {email,password} = req.body;
    //Validate User
    if(!email||!password){
        return res.status(400).json({
            success:false,
            message:"Enter Ur password or email"
        })
    }
    const response = await User.findOne({email});
    const pass = await bcrypt.compare(password,response.password);
    if(pass){
        return res.status(200).json({
            success:true,
            message:"Login Successful"
        })
    }
}
    catch(err){
        res.status(400).json({
            success:false,
            message:"Login Failed",
            data:err.message
        })
    }
    
}

//Login for forgot Password
exports.forgotController = async (req,res)=>{
    try{
    const {email,password} = req.body;
    const emailAvl = await User.findOne({email});
    if(!emailAvl){
    return res.status(400).json({
        success:false,
        message:"Email not registered"
    })
}
const hashPass = await bcrypt.hash(password,10);
const response = await User.findOneAndUpdate({email:email,password:hashPass});
res.status(200).json({
    success:true,
    message:"Password Updated!",
    response:response
})
    }
    catch(err){
        return res.status(400).json({
            success:false,
            message:"Not able to update password",
            data:err.message
        })
    }
}
