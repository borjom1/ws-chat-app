import defaultAvatar from "../assets/user.png";

const ChatItem = ({avatar, name, time, message, onClick}) => {

  return (
    <div
      onClick={onClick}
      className='flex gap-3 px-5 py-2 items-center duration-300 cursor-pointer hover:bg-eerie-black'>

      <img className='h-min' src={avatar ?? defaultAvatar} width={40} alt={'avatar'}/>

      <div className='w-full flex flex-col gap-1.5'>
        <div className='w-full flex justify-between items-center'>
          <h2 className='text-[#DBDBDB] leading-none'>{name}</h2>
          <h2 className='text-xs text-[#525252] leading-none'>{time}</h2>
        </div>
        <p className='text-xs text-[#999999] leading-none'>{message}</p>
      </div>

    </div>
  );
};

export default ChatItem;