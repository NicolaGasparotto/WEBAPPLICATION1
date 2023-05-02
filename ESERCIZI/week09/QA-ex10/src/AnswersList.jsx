import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

function AnswersList(){
    // const params = useParams();
    // console.log(params);

    const {questionId} = useParams() ;

    return <div>
        <p>ANSWERS LIST TO QUESTION NUMBER {questionId}</p> 
        <ul>
            <li>Answer One - DELETE VOTE <Link to={`/editAnswer/${questionId}/1`}>EDIT</Link></li>
            <li>Answer Two - DELETE VOTE <Link to={`/editAnswer/${questionId}/2`}>EDIT</Link></li>
            <li>Answer Three - DELETE VOTE <Link to={`/editAnswer/${questionId}/3`}>EDIT</Link></li>
        </ul>
        <p><Link to={`/addAnswer/${questionId}`}>ADD</Link></p>
        <p><Link to='/'>BACK</Link></p>
    </div>;
}

export { AnswersList } ;