import { useEffect, useState } from 'react';
import { BsFillPersonFill } from 'react-icons/bs';
import { AiOutlineSend } from 'react-icons/ai';
import Message from './Message';
import MessageField from './MessageField';
import Button from './Button';
import '../styles/scrollbar.css';
import classNames from 'classnames';
import { SlLayers } from 'react-icons/sl';

const Chat = ({ className, login, messages, onSendClick }) => {

  const [msgText, setMsgText] = useState('');

  const mappedMessages = messages?.map(({ id, text, time, isOwn }) =>
    <Message
      key={id}
      text={text}
      time={time}
      isOwn={isOwn}
    />
  );

  const root = classNames(
    "bg-eerie-black-f h-full rounded-xl overflow-hidden",
    className
  );

  return (
    <div className={root}>
      {!login ?
        <div className='h-full flex flex-col gap-1 justify-center items-center'>
            <SlLayers size={28} color={'#4E4E4E'}/>
            <p className='text-[#4E4E4E]'>Select any chat to start communication...</p>
        </div> :
        <>
          <div className="h-[12%] bg-[#282828] rounded-t-xl py-2.5 px-8 flex gap-3 items-center">
            <div className='bg-[#1e1e1e] rounded-full py-2 px-2'>
              <BsFillPersonFill size={30} color='#E8E8E8' />
            </div>
            <h1 className="text-platinum-e8 text-2xl font-medium">{login}</h1>
          </div>

          <div className='h-[70%] border-2 border-[#282828] flex-col flex gap-4 mt-3 mx-2 rounded-md py-3 px-3 overflow-y-scroll'>
            {mappedMessages}
          </div>

          <div className='h-[12%] mx-2 mt-3 flex gap-2 justify-between'>
            <MessageField
              className='w-[90%] h-full'
              text={msgText}
              onChange={value => setMsgText(value)}
            />
            <Button
              onClick={() => {
                setMsgText('');
                console.log('clicked!');
                onSendClick(msgText);
              }}
              bgClassName={'px-2 py-2 hover:bg-[#2B4071]'}
              icon={<AiOutlineSend size={25} color='#DBDBDB' />}
              bgColor={'blue-39'}
            />
          </div>
        </>
      }

    </div>
  );
};

export default Chat;