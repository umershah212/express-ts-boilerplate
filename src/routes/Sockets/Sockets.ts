import { SocketsController } from '@controllers/index';
import { envHelper } from '@helpers/index';
import jwt from 'jsonwebtoken';

const Sockets = (app, io) => {
  io.use(function (socket, next) {
    const token = socket.handshake.auth.token;
    if (token) {
      jwt.verify(token, envHelper.jwtSecret(), async (err, decoded) => {
        if (err) {
          return next(new Error('Authentication error'));
        }
        if (decoded.type == 'refresh') {
          //check for refresh token here
          //const result = await User.findOne({
          //  _id: decoded.data._id,
          //  refreshToken: token,
          //});
          //if (result == null) {
          //  next(new Error('Authentication error'));
          //}
        }
        socket.decoded = decoded;
        next();
      });
    } else {
      next(new Error('Authentication error'));
    }
  });

  io.on('connection', async (socket) => {
    SocketsController.connection(socket, io);
    socket.on('disconnect', () => SocketsController.disconnect(socket, io));
    //socket - entered new match chat
  });
};

export default Sockets;
