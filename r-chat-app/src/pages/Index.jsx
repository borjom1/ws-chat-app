import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import {useEffect} from "react";
import {getStompClient} from "../ws/stompClient";
import {getTime} from "../utils/dateParser";
import {getUser} from "../utils/localStorage";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {
  updateChat,
  addMessage,
  setStompClient
} from "../store/slice/chatSlice";

const Index = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const stompClient = useSelector(({chat}) => chat.stompClient);
  const chats = useSelector(({chat}) => chat.chats);
  const selectedChat = useSelector(({chat}) => chat.selectedChat);

  useEffect(() => {
    const storage = getUser();
    if (!storage) {
      navigate('/sign_in');
      return;
    }

    // setup ws connection
    const stomp = getStompClient();
    dispatch(setStompClient(stomp));

    if (stomp) {
      stomp.connect(
        {id: storage.id},
        () => onConnected(stomp, storage.id),
        e => console.log('error', e)
      );
    }

  }, []);

  const onConnected = (stomp, userId) => {
    stomp.subscribe('/topic/connected', onPublicMessageReceived);
    stomp.subscribe(`/queue/${userId}`, onPrivateMessageReceived);
  };

  const onPublicMessageReceived = ({body}) => {
    console.log('public', body);

    const {senderId, senderLogin, timestamp, text} = JSON.parse(body);

    const newMessage = {
      id: timestamp,
      text,
      time: getTime(new Date(timestamp)),
      isOwn: false
    };

    dispatch(updateChat({
      senderId,
      login: senderLogin,
      newMessage
    }));
  };

  const onPrivateMessageReceived = ({body}) => {
    console.log('private', body);
    const {senderId, senderLogin, timestamp, text} = JSON.parse(body);

    const receivedChatMessage = {
      senderId,
      login: senderLogin,
      newMessage: {
        id: timestamp,
        text,
        time: getTime(new Date(timestamp)),
        isOwn: false
      }
    };

    dispatch(updateChat(receivedChatMessage));
  };

  const handleSendClick = msg => {

    if (!selectedChat) return;

    // add my message
    const payload = {
      destinationUserId: selectedChat,
      newMessage: {
        id: Date.now(),
        text: msg,
        time: getTime(new Date()),
        isOwn: true
      }
    };

    dispatch(addMessage(payload));

    const {id} = getUser();

    const transportMessage = {
      senderId: id,
      receiverId: selectedChat,
      text: msg
    };
    console.log('message to send: ', transportMessage)

    stompClient?.send('/app/send.message', {}, JSON.stringify(transportMessage));
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-3/5 h-4/5 bg-eerie-black rounded-xl flex gap-3 py-3 px-3">
        <div className="w-[35%]">
          <ChatList chats={chats}/>
        </div>
        <div className="w-[65%]">
          <Chat
            // className={'hover:scale-[0.99] duration-200'}
            meta={chats.find(chat => chat.userId === selectedChat)}
            onSendClick={handleSendClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;