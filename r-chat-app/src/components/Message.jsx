import classNames from "classnames";

const Message = ({ text, time, isOwn }) => {

  const root = classNames(
    isOwn ? 'bg-blue-39' : 'bg-gray',
    isOwn ? 'rounded-bl-[30px]' : 'rounded-br-[30px]',
    isOwn && 'self-end',
    'w-max py-1 px-3 rounded-t-[30px] relative',
  );

  const timeClasses = classNames(
    isOwn ? 'right-0' : 'left-0',
    'absolute top-8 text-xs text-[#565656]'
  );

  return (
    <div className={root}>
      <p className='text-platinum-e8'>{text}</p>
      <p className={timeClasses}>{time}</p>
    </div>
  );
};

export default Message;