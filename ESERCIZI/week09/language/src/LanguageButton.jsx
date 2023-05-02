import { useContext } from "react";
import LanguageContext from "./LanguageContext";

function LanguageButton(props) {
    // only with these specification the button will NOT be re-rendered
    const lang = useContext(LanguageContext);

    if (lang === 'EN') {
        return <button onClick={props.toogle}>EN</button>;
    } else {
        return <button onClick={props.toogle}>IT</button>;
    }
}

export { LanguageButton };