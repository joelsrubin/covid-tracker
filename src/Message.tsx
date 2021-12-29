const Message: React.FC<MessageProps> = ({ sentHandler, sent }) => {
  return (
    <header className='App-header'>
      <button className='cashout' disabled={sent} onClick={sentHandler}>
        {sent ? 'Cashed Out' : 'Cash Out'}
      </button>
    </header>
  );
};

export default Message;
