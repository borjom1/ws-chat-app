import {BiMessageSquareDetail} from 'react-icons/bi';
import ChatItem from "./ChatItem";
import classNames from 'classnames';
import {useDispatch} from "react-redux";
import {selectChat} from "../store/slice/chatSlice";

const ChatList = ({className, chats}) => {

  const dispatch = useDispatch();

  const mappedChats = chats?.map(({userId, login, messages}) => {
    const lastMsg = messages.slice(-1)[0];
    return (
      <ChatItem
        onClick={() => dispatch(selectChat(userId))}
        key={userId}
        name={login}
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
        <BiMessageSquareDetail size={30} color='#E8E8E8'/>
        <h1 className="text-platinum-e8 text-xl font-medium">All Chats</h1>
      </div>
      <div className='h-[90%] overflow-y-scroll'>
        {mappedChats}
      </div>
    </div>
  );
};

export default ChatList;