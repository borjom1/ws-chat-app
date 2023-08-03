import { BiMessageSquareDetail } from 'react-icons/bi';
import ChatItem from "./ChatItem";
import classNames from 'classnames';

const ChatList = ({ className, chats, setSelectedChat }) => {

  const mappedChats = Array.from(chats)?.map(([userId, data]) => {
    const lastMsg = data.messages?.slice(-1)[0];
    return (
      <ChatItem
        onClick={() => setSelectedChat(userId)}
        key={userId}
        name={data.login}
        time={lastMsg?.time}
        message={lastMsg?.text}
      />
    );
  });

  const root = classNames(
    "bg-eerie-black-f h-full rounded-xl",
    className
  );

  return (
    <div className={root}>
      <div className="h-[10%] bg-blue-39 rounded-t-xl py-2.5 px-6 flex gap-3 items-center">
        <BiMessageSquareDetail size={30} color='#E8E8E8' />
        <h1 className="text-platinum-e8 text-xl font-medium">All Chats</h1>
      </div>
      <div className='h-[90%] overflow-y-scroll'>
        {mappedChats}
      </div>
    </div>
  );
};

export default ChatList;