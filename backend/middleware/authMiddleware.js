const jwt=require("jsonwebtoken")
const secret = "123456";

exports.authMiddleWare = (req, res, next) => {
  try {
    const token = req.body?.token || req.cookies?.token || req?.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({
        status: false,
        message: "Token missing",
      });
    }

    // const secret = process.env.JWT_SECRET;
    const verifyToken = jwt.verify(token, secret);
    
    req.user = verifyToken;
    next();
  } catch (err) {
    // console.error("Token validation error:", err.message); // Log the actual error
    return res.status(401).json({
      status: false,
      message: "Error occurred while validating the token",
    });
  }
};
