const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../modals/User");

require("dotenv").config();


exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            street,
            Address,
            City,
            State,
            email,
            password,
            phoneNumber,
        } = req.body;

        if (
            !firstName ||
            !lastName ||
            !email ||
            !password
        ) {
            res.status(400).json({
                success: false,
                message: "Fill all the details",
              
            })
            return ;
        }

        
        const userAlreadyRegister = await User.findOne({ email });
        if (userAlreadyRegister) {
            res.status(400).json({
                success: false,
                message: "User already registered please Login",
            })
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const createCustomer = await User.create({
            firstName,
            lastName,
            street,
            Address,
            City,
            State,
            email,
            password: hashedPassword,
            phoneNumber,
        })
        
         res.status(201).json({
            success: true,
            User,
            message: "Successfully Created",
        });
        return;
    } catch (error) {
        console.log(error);
         res.status(400).json({
            success: false,
            message: "Error while signup",
        })
        return
    }
};


exports.login = async (req, res) => {
    try {

        const { email, password } = req.body;


        if (!email || !password) {

            return res.status(401).json({
                success: false,
                message: `Please Fill up All the Required Fields`,
            });
        }


        const user = await User.findOne({ email });


        if (!user) {

            return res.status(401).json({
                success: false,
                message: `User is not Registered with Us Please SignUp to Continue`,
            });
        }


        if (await bcrypt.compare(password, user.password)) {
            const token = jwt.sign(
                { email: user.email, id: user._id },
                process.env.JWT_SECRET,
                {
                    expiresIn: "24h",
                }
            );


            user.token = token;
            user.password = undefined;

            const options = {
                expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            };
            res.cookie("token", token, options).status(201).json({
                success: true,
                token,
                user,
                message: `User Login Success`,
            });
        } else {
            return res.status(401).json({
                success: false,
                message: `Password is incorrect`,
            });
        }
    } catch (error) {
        console.error(error);

        return res.status(400).json({
            success: false,
            message: `Login Failure Please Try Again`,
        });
    }
};


exports.getAllUserDetails = async (req, res) => {
    try {
        
        // populate is missing 
        const {email} = req.body;
        console.log(email)
        const userDetails = await User.findOne({email: email});
        if(!userDetails){
            res.status(400).json({
                success: false,
                message: "user not found"
            })
        }
        console.log("jue")
        console.log(userDetails);
        res.status(200).json({
            success: true,
            message: userDetails,
        });
        
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

exports.deleteAccount = async (req, res) => {
    try {

        const {email} = req.body;
        const user = await User.findOne({ email : email});
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "UUID not found",
            });
        }
        const user1 = await User.findOneAndDelete({ email : email});


        // await user.findByIdAndDelete({ _id: id });
        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error Not Deleted",
        });
    }
};

exports.update = async (req, res) => {
	try {
		// const { firstName = "", lastName = "", Street ="" , Address="" ,City="",State=""
        //  , phoneNumber,email } = req.body;
		// const {email, firstName, lastName}= req.body;

		
		const {email} = req.body;
        

        var userDetails = await User.findOneAndUpdate({email: email}, req.body, {new: true, runValidators: true,})


		// userDetails.firstName = firstName;
		// userDetails.lastName = lastName;
        // userDetails.Street = Street;
        // userDetails.Address=Address;
        // userDetails.City=City;
        // userDetails.State=State;
		// userDetails.phoneNumber = phoneNumber;

		
		// await userDetails.save(); //-----------------------------------------------------------------------------
         userDetails = await User.find({email: email})
		return res.status(200).json({
			success: true,
			message: "User updated successfully",
			userDetails,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({
			success: false,
			error: error.message,
            message:`UUID not Found`,
		});
	}
};