import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const token = req.header.authorization;

  if (!token) {
    return res.status(401).json({ message: "Bad auth" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Bad auth" });
    }
    req.body.userId = decoded.userId;
    req.body.fullName = decoded.fullName;
  });
  return next();
};
export default authenticateUser;
