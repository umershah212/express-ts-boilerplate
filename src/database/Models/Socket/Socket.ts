import { Schema, model } from 'mongoose';
import { ISocket } from './Socket.types';
const socketSchema = new Schema({
  socketId: {
    type: String,
    required: true,
  },
});

const Socket = model<ISocket>('sockets', socketSchema);

export default Socket;
