const checkRole = (role) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    if (userRole === role) {
      next();
    } else {
      return res.status(403).json({ message: 'Unauthorized access' });
    }
  };
};

export default checkRole;