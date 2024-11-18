// Định nghĩa middleware
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization;
  
    if (!token) {
      return res.status(401).json({ message: "Authorization token is missing" });
    }
  
    try {
      // Thực hiện xác thực token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      return res.status(403).json({ message: "Invalid token" });
    }
  };
  
  // Xuất middleware
  export default authMiddleware;
  