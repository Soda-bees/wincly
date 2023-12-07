import io from 'socket.io-client';
import backendURL from './backendURL';
import {useSelector} from 'react-redux';

let socket;
export default socket = io(backendURL);

socket.on('connect', () => {
  console.log('Connected to server');
  socket.emit(`ConnectDetails`, {username: 'aleem'});
});
