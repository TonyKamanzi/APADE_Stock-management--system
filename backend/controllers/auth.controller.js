import bcrypt from "bcrypt";
import User from "../models/users.js";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Inavlid credentials" });
    }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({message:"Invalid creditals"})
      }
      req.session.userId = {
          id: user._id,
          email:user.email,
          role: user.role,

    }
    res.json({ message: "Login succefully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const signup = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({ name, email, password: hashedPassword,  })
      res.status(201).json(user)
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

export const logout =  (req, res) => {
    req.session.destroy(() => {
        res.clearCookie('connect.sid');
        res.json({message: "logged out"})
    })
}

export const getCurrentUser = (req, res) => {
    if (req.session.user) {
        res.json({user: req.session.user})
    } else {
        res.status(401).json({message: "Not logged in"})
   }
}