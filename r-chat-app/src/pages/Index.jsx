import ChatList from "../components/ChatList";
import Chat from "../components/Chat";
import { useEffect, useState } from "react";
import { getStompClient } from "../ws/stompClient";
import UsernameModal from "../components/UsernameModal";
import { getTime } from "../utils/dateParser";

const Index = () => {

  const [username, setUsername] = useState(null);
  const [stompClient, setStompClient] = useState(null);
  const [chats, setChats] = useState(new Map());
  const [selectedChat, setSelectedChat] = useState(null);

  const updateChats = (login, messages) => {
    setChats(prevChats => {
      const oldMessages = prevChats.get(login);
      const updMessages = oldMessages ? [...oldMessages, ...messages] : messages;
      return new Map(prevChats.set(login, updMessages))
    });
  };

  useEffect(() => {
    if (!username) {
      return;
    }

    // setup ws connection
    const stomp = getStompClient();
    setStompClient(stomp);
    stomp.connect({username}, () => onConnected(stomp), e => console.log('error', e));

  }, [username]);

  const onConnected = stomp => {
    console.log(stomp);
    stomp.subscribe('/topic/connected', onPublicMessageReceived);
    stomp.subscribe(`/queue/${username}`, onPrivateMessageReceived);
  };

  const onPublicMessageReceived = ({body}) => {
    console.log('public', body);

    const {username: login, timestamp} = JSON.parse(body);

    const connectMessage = {
      id: timestamp, 
      text: 'Just connected', 
      time: getTime(new Date(timestamp)), 
      isOwn: false
    };

    updateChats(login, [connectMessage]);
  };

  const onPrivateMessageReceived = ({body}) => {
    console.log('private', body);
    const {username: login, timestamp, text} = JSON.parse(body);

    const message = {
      id: timestamp, 
      text, 
      time: getTime(new Date(timestamp)), 
      isOwn: false
    };

    updateChats(login, [message]);
  };

  const handleSendClick = msg => {

    if (!selectedChat) return;

    // add my message
    updateChats(selectedChat, [{
      id: Date.now(), 
      text: msg, 
      time: getTime(new Date()), 
      isOwn: true
    }]);

    const message = {
      sender: username,
      receiver: selectedChat,
      text: msg
    };
    console.log('message to send: ', message)

    stompClient?.send('/app/send.message', {}, JSON.stringify(message));
  };

  return (
    <div className="w-full h-[100vh] flex justify-center items-center">
      <div className="w-3/5 h-4/5 bg-eerie-black rounded-xl flex gap-3 py-3 px-3">
        {!username ? <UsernameModal onClick={username => setUsername(username)} /> :
          <>
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
                login={selectedChat}
                messages={chats.get(selectedChat)}
                onSendClick={handleSendClick}
              />
            </div>
          </>
        }
      </div>
    </div>
  );
};

export default Index;