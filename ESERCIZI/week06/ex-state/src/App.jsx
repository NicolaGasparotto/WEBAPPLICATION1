import { useState } from 'react'
import './App.css'

function App() {

  const [language, setLanguage] = useState('IT'); // default initial value of the state
  const [count, setCount] = useState(0); 


  function toggle_language(){
    if(language === 'IT')
      setLanguage('EN');
    else
      setLanguage('IT');

      setCount( (old_count)=>(old_count+1) );
  }

  return (
    <div className="App">
      <p><button onClick={toggle_language}>
        {language === 'IT' ? 'Italiano' : 'English' }
      </button></p>
      <p>
        {language === 'IT' ?
          <button onClick={ ()=> {setLanguage('EN')}}>Italiano</button> :
          <button onClick={ ()=> {setLanguage('IT')}}>English</button>
        }
      </p>
      {/* This is another way to do it but it doesn't work
          <p><button onClick={()=>{ setLanguage('EN')}}>
            {language === 'IT' ? 'Italiano' : 'English' }
          </button></p>
       <p>
        {language === 'IT' ? 'Buongiorno' : 'Hello, World'}
      </p>
        */}
      <Message language={language} count={count}/>
      {/*
        // wirting it in this way will give the function too much control, and it can be possible for the function to modify the 
        // setLanguage function and have control over it (too low level logic)
        <MyButton language={language}/ setLanguage={setLanguage}> 
         
        // the CORRECT way is to extend a callback function from the App to the childern, and this callback function will use the setLanguage method.
        */}
      <MyButton language={language} toggleLanguage={toggle_language}/>
    </div>
  )
}

function Message(props){
  
  // IS NOT POSSIBLE TO DO IN THIS WAY, BECAUSE IT WILL OVERWRITE THE VARIABLE
  /**
  const [msgLang, setMsgLang] = useState(props.language);
  return <p>{msgLang === 'IT' ? 'Buongiorno' : 'Hello, world'}</p> 
  ;
   */
  // IS ALWAY WRONG TO CREATE A STATE FROM A FUNCTION PROPERTY
  return <p>{props.language === 'IT' ? 'Buongiorno' : 'Hello, world'} {props.count}</p> 
  ;
}

function MyButton(props){
  // setLanguage cannot be called inside this childFunction
  return <>
    {props.language === 'IT' ?
        <button onClick={props.toggleLanguage}>Italiano</button> :
        <button onClick={props.toggleLanguage}>English</button>
    }
    </>
  ;
}

export default App
