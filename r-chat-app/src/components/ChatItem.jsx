import { BsFillPersonFill } from 'react-icons/bs';

const ChatItem = ({ name, time, message, onClick }) => {

  return (
    <div
      onClick={onClick}
      className='flex gap-3 px-3 py-2 duration-300 cursor-pointer hover:bg-eerie-black'>

      <div className='bg-[#282828] py-2 px-2 rounded-full'>
        <BsFillPersonFill size={30} color='#ffffff' />
      </div>

      <div className='w-full flex-col'>
        <div className='w-full flex justify-between items-center'>
          <h2 className='text-[#DBDBDB] font-medium'>{name}</h2>
          <h2 className='text-xs text-[#525252]'>{time}</h2>
        </div>

        <p className='text-sm text-[#999999]'>{message}</p>
      </div>

    </div>
  );
};

export default ChatItem;