import { Socket } from '@models/index';
import { ISocket } from '@models/index';
import { to } from '@helpers/index';
class SocketsController {
  public static async connection(socket: any, _io: any) {
    const [err]: [Error] = await to(
      Socket.findOneAndUpdate({ socketId: socket.id }, { socketId: socket.id }, { upsert: true, new: true, setDefaultsOnInsert: true }),
    );
    if (err) _io.to(socket.id).emit('error', err);
  }

  public static async disconnect(socket: any, _io: any) {
    const [err, socketDelete]: [Error] | [null, ISocket] = await to(Socket.findOneAndDelete({ socketId: socket.id }));
    if (err) console.error('error in socket disconnect', err);
    if (socketDelete) {
    }
  }
}

export default SocketsController;
