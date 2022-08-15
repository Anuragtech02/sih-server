import jwt from "jsonwebtoken";

export async function adminAuthCheck(req, res, next) {
  try {
    const token = req.headers.authorization;
    if (!token) {
      return res.status(400).json({
        status: "error",
        message: "No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.AUTH_KEY);

    if (!decoded?.id) {
      return res.status(400).json({
        status: "error",
        message: "Invalid Token",
      });
    }
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
