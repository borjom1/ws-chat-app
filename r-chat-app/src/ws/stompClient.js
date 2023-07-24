import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";

const URL = 'http://127.0.0.1:8080/ws';

export const getStompClient = () => {
  const socket = new SockJS(URL);
  return Stomp.over(socket);
};