import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import {useEffect, useState} from "react";
import {getStompClient} from "../ws/stompClient";
import {getTime} from "../utils/dateParser";
import {getUser} from "../utils/localStorage";
import {useNavigate} from "react-router-dom";

const Index = () => {

  const navigate = useNavigate();

  const [stompClient, setStompClient] = useState(null);
  const [chats, setChats] = useState(new Map());
  const [selectedChat, setSelectedChat] = useState(null);

  const updateChats = (userId, data) => {
    setChats(prevChats => {
      const {messages: newMessages, ...rest} = data;

      const oldMessages = prevChats.get(userId)?.messages;
      const updMessages = oldMessages ? [...oldMessages, ...newMessages] : newMessages;

      return new Map(prevChats.set(userId, {
        messages: updMessages,
        ...rest
      }))
    });
  };

  const addMessage = (userId, message) => {
    setChats(prevState => {
      const chat = prevState.get(userId);
      if (chat) {
        const oldMessages = chat.messages;
        chat.messages = oldMessages ? [...oldMessages, message] : [message];
        return new Map(prevState);
      }
    });
  };

  useEffect(() => {
    const storage = getUser();
    if (!storage) {
      navigate('/sign_in');
      return;
    }

    // setup ws connection
    const stomp = getStompClient();
    setStompClient(stomp);
    stomp.connect({id: storage.id},
      () => onConnected(stomp, storage.id),
      e => console.log('error', e)
    );

  }, []);

  const onConnected = (stomp, userId) => {
    console.log(stomp);
    stomp.subscribe('/topic/connected', onPublicMessageReceived);
    stomp.subscribe(`/queue/${userId}`, onPrivateMessageReceived);
  };

  const onPublicMessageReceived = ({body}) => {
    console.log('public', body);

    const {senderId, senderLogin, timestamp, text} = JSON.parse(body);

    const connectMessage = {
      id: timestamp,
      text,
      time: getTime(new Date(timestamp)),
      isOwn: false
    };

    updateChats(senderId, {
      login: senderLogin,
      messages: [connectMessage]
    });
  };

  const onPrivateMessageReceived = ({body}) => {
    console.log('private', body);
    const {senderId, senderLogin, timestamp, text} = JSON.parse(body);

    const message = {
      id: timestamp,
      text,
      time: getTime(new Date(timestamp)),
      isOwn: false
    };

    updateChats(senderId, {
      login: senderLogin,
      messages: [message]
    });
  };

  const handleSendClick = msg => {

    if (!selectedChat) return;

    // add my message
    addMessage(selectedChat, {
      id: Date.now(),
      text: msg,
      time: getTime(new Date()),
      isOwn: true
    });

    const {id} = getUser();

    const message = {
      senderId: id,
      receiverId: selectedChat,
      text: msg
    };
    console.log('message to send: ', message)

    stompClient?.send('/app/send.message', {}, JSON.stringify(message));
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-3/5 h-4/5 bg-eerie-black rounded-xl flex gap-3 py-3 px-3">
        <div className="w-[35%]">
          <ChatList
            // className={'hover:scale-[0.99] duration-200'}
            chats={chats}
            setSelectedChat={setSelectedChat}
          />
        </div>
        <div className="w-[65%]">
          <Chat
            // className={'hover:scale-[0.99] duration-200'}
            meta={chats.get(selectedChat)}
            onSendClick={handleSendClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Index;