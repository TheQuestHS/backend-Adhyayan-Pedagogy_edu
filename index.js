import express from "express"
import cors from "cors"
import mongoose from "mongoose"

const app = express()
app.use(express.json())
app.use(express.urlencoded())
app.use(cors())
//mongodb://localhost:27017/mySignup-Log
mongoose.connect('mongodb+srv://Dhruvdeshmukh:dhruv110102@cluster0.t0wzn.mongodb.net/traveldata?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
},()=>{
    console.log("DB connected")
});

const userSchema= new mongoose.Schema({
    Username: String,
    email: String,
    password: String,
})

const User = new mongoose.model("User", userSchema)

//Route
app.post("/login",(req,res)=>{
    const{username, email,password}=req.body
    User.findOne({email:email},(err,user)=>{
        if(user){
            if(password===user.password){
                res.send({message:"Login Sucessfull",user: user})
            }else{
                res.send({message:"Password did not match"})
            }

        }else{
            res.send({message:"User not registered"})
        }
    })
})
app.post("/signUp",(req,res)=>{
    const{username, email,password}=req.body
    User.findOne({email: email},(err,user)=>{
        if(user){
            res.send({message:"User already registered"})
        }else{
            const user=new User({
                username,
                email,
                password
            })
            user.save(err => {
                if(err){
                    res.send(err)
        
                }else{
                    res.send({message:"Sucessfully Registered, Use login Next time"})
                }
            })

        }
    })
    
})
app.listen(9002,()=>{
    console.log("Backend started at port 9002")
})