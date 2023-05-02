import { Link } from "react-router-dom";

function PageNotFound(props){
    return <>
        <p>PAGE NOT FOUND</p>
        <p><Link to='/'>Back to the Home Page</Link></p>
    </>
}

export { PageNotFound };