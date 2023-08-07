import { useState } from 'react';
import avatar from '../assets/user.png';
import Message from './Message';
import MessageField from './MessageField';
import Button from './Button';
import '../styles/scrollbar.css';
import classNames from 'classnames';
import { SlLayers } from 'react-icons/sl';
import { AiOutlineFieldTime } from 'react-icons/ai';
import {BiMailSend} from "react-icons/bi";

const Chat = ({ className, meta, onSendClick }) => {

  const [msgText, setMsgText] = useState('');

  const mappedMessages = meta?.messages?.map(({ id, text, time, isOwn }) =>
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
      {!meta ?
        <div className='h-full flex flex-col gap-1 justify-center items-center'>
            <SlLayers size={28} color={'#4E4E4E'}/>
            <p className='text-[#4E4E4E]'>Select any chat to start communication...</p>
        </div> :
        <div className='h-full flex flex-col gap-4 cursor-default'>
          <div className="h-[12%] bg-[#282828] rounded-t-xl py-2.5 px-6 flex gap-3 items-center">
            <img src={meta.avatar ?? avatar} width={43} height={43} alt={'avatar'}/>
            <div className='w-full flex flex-col gap-1.5'>
              <h1 className="text-[#EFEFEF] text-xl leading-none">{meta.username}</h1>
              <h2 className="text-[#969696] text-xs leading-none">@{meta.login}</h2>
            </div>
            <div className='flex gap-1 items-center'>
              <AiOutlineFieldTime size={20} color={'#636363'}/>
              <p className='w-max font-medium text-xs text-[#636363] leading-none cursor-default'>Last seen at 15:49</p>
            </div>
          </div>

          <div className='h-[75%] border-2 border-[#282828] bg-[#212121] flex-col flex gap-4 mx-6 rounded-md py-3 px-3 overflow-y-scroll'>
            {mappedMessages}
          </div>

          <div className='h-[13%] px-6 flex gap-2 justify-between'>
            <MessageField
              className='w-[90%] h-[41px]'
              text={msgText}
              onChange={value => setMsgText(value)}
            />
            <Button
              onClick={() => {
                setMsgText('');
                onSendClick(msgText);
              }}
              bgClassName={'px-2 py-2 hover:bg-[#2B4071]'}
              icon={<BiMailSend size={25} color='#DBDBDB' />}
              bgColor={'blue-39'}
            />
          </div>
        </div>
      }
    </div>
  );
};

export default Chat;