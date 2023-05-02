import { LanguageButton } from './LanguageButton';
import { Message } from './Message';
import { useState } from 'react';
import LanguageContext from './LanguageContext';

function App() {
  const [lang, setLang] = useState('EN');

  const langToogle =() => {
    setLang((oldLang) => {
      if (oldLang === 'EN') {
        return 'IT';
      } else {
        return 'EN';
      } 
    });
  }

  return (<>
    {/* we are propagating the value through the provider */}
    <LanguageContext.Provider value={lang}>
      {/* With the toogle callback the button will be re-rendered */}
      <LanguageButton toogle={langToogle} />
      <Message />
    </LanguageContext.Provider>
  </>
  )
}

export default App;
