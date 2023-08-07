import classNames from "classnames";

const MessageField = ({className, text, onChange}) => {

  const bgClasses = classNames(
    'resize-none outline-0',
    'bg-[#282828] w-full h-3/5 py-3 px-4 overflow-hidden rounded-md',
    className
  );

  const textClasses = classNames('text-silver-bf text-sm placeholder-[#424242]');

  return (
    <textarea
      value={text}
      className={classNames(bgClasses, textClasses)}
      placeholder='type your message...'
      onChange={event => onChange(event.target.value)}
    />
  );
};

export default MessageField;