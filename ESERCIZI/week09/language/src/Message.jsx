import { useContext } from "react";
import LanguageContext from "./LanguageContext";

function Message() {
    // I'm not using any props, I'm just using the context
    // context is a Hook in this case inside the webTool 
    // lang is a Local variable 
    const lang = useContext(LanguageContext);

    if(lang === 'EN'){
        return <p>Message in English</p>
    }else{
        return <p>Messaggio in Italiano</p>
    }
    
}

export { Message };