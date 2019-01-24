import React from 'react';
import io from 'socket.io-client';

const socket = io(process.env.API_URL);

const withSocket = ChildComponent => props => (
  <ChildComponent {...props} socket={socket} />
);

export default withSocket;
