import { Link } from "react-router-dom";

function QuestionsList(){
    return <div>
    {/* Is possible to generate this list Dinamically */}
    <p>LIST OF QUESTIONS</p>
    <ul>
        <li><Link to='/answers/1'>Question One</Link></li>
        <li><Link to='/answers/2'>Question Two</Link></li>
    </ul>
    </div>;
}

export { QuestionsList };