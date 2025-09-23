const User = require("../model/UserModel.js");
const jwt = require("jsonwebtoken");
const config = require("../DatabaseConfig/config.js");

const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Please login to your account!" });
  }
  const user = await User.findOne({
    where: {
      id: req.session.userId
    }
  });
  if (!user) return res.status(404).json({ msg: "User not found" });
  req.userId = user.id;
  req.userId = user.role;
  next();
};

const bothOnly = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: 'Invalid authorization header format. Use "Bearer token".'
    });
  }

  const actualToken = token.slice(7); 

  try {
    const decoded = jwt.verify(actualToken, config.secret);
    if (decoded && decoded.id) {
      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (user.role !== "admin" && user.role !== "user"){
        return res.status(403).json({ msg: "User does not have admin access" });
      }
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


const adminOnly = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res.status(401).json({ msg: "Unauthorized: No token provided" });
  }

  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({
      msg: 'Invalid authorization header format. Use "Bearer token".'
    });
  }

  const actualToken = token.slice(7); 

  try {
    const decoded = jwt.verify(actualToken, config.secret);
    if (decoded && decoded.id) {
      const user = await User.findOne({
        where: {
          id: decoded.id
        }
      });

      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      if (user.role !== "admin") {
        return res.status(403).json({ msg: "User does not have admin access" });
      }
      next();
    } else {
      res.status(401).json({ msg: "Unauthorized: Invalid token" });
    }
  } catch (error) {
    console.error("JWT Error:", error.message);
    res.status(500).json({ msg: "Internal Server Error" });
  }
};


const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }
  if (!token.startsWith("Bearer ")) {
    return res.status(401).json({
      message: 'Invalid authorization header format. Use "Bearer token".'
    });
  }
  const actualToken = token.slice(7);

  try {
    const decoded = jwt.verify(actualToken, config.secret);
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (err) {
    if (err.name === "JsonWebTokenError") {
      if (err.message === "jwt expired") {
        res.status(401).json({ message: "Token has expired." });
      } else {
        console.error("JWT Error:", err.message);
        res.status(401).json({ message: "Invalid token." });
      }
    } else {
      console.error("Error verifying token:", err.message);
      res.status(500).json({ message: "Internal server error." });
    }
  }
};

module.exports = {
  verifyUser,
  adminOnly,
  bothOnly,
  verifyToken
};
