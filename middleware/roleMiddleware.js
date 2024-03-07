
import User from "../models/users";

const checkRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role; 
    if (User.role[userRole].includes(role)) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  };
};
export default checkRole;