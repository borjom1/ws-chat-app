import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import env from "react-dotenv";

const URL = `${env.API_URL}/ws`;

export const getStompClient = () => {
  const socket = new SockJS(URL);
  return Stomp.over(socket);
};