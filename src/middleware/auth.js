import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "bad token" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "bed decoded" });
    }
    req.body.userId = decoded.userId;
    req.body.fullName = decoded.fullName;
  });
  return next();
};
export default authenticateUser;
