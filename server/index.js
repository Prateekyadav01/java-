const express = require("express");
const app = express();
const cors = require("cors");

const userRoutes = require("./routes/User");
const database = require("./config/database");

const dotenv = require("dotenv");

dotenv.config();
const PORT = process.env.PORT || 4000;

database.connect();

app.use(express.json());
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true,
}));


app.use("/api/v1/auth",userRoutes);

app.get("/",(req,res)=>{
    return res.json({
        success:true,
        message:'Your server is running up',
    })
});

app.listen(PORT,()=>{
    console.log(`App is running at ${PORT}`);
})