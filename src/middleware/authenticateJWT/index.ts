import { envHelper } from '@helpers/index';
//import { User } from '@models/index';
import jwt from 'jsonwebtoken';
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(' ')[1];

    jwt.verify(token, envHelper.jwtSecret(), async (err, decoded) => {
      if (err) {
        return res.status(401).json({ status: 401, data: err.name });
      }
      if (decoded.type == 'refresh') {
        //check for refresh token here
        //const result = await User.findOne({
        //  _id: decoded.data._id,
        //  refreshToken: token,
        //});
        //if (result == null) {
        //  return res.status(403).json({ status: 403, data: 'unauthorised' });
        //}
        if (!req.originalUrl.includes('/token')) {
          return res.status(403).json({ status: 403, data: 'invalid refresh token use' });
        }
      }
      req.user = decoded;
      next();
    });
  } else {
    return res.status(403).json({ status: 403, data: 'unauthorised' });
  }
};

export default authenticateJWT;
