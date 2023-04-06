function MessageList(props){
    const cnt = props.count;
    const messages = [];
    for(let i=0; i<cnt; i++){
      messages.push(<Message text={props.text}/>);
    }
    return <div>{messages}</div>;
  }
  
  function Message(props){
    const text = props.text;
    return <p>First {text} component</p>;
  }

export {MessageList};