import { useParams, useNavigate } from "react-router-dom";

function AddAnswer(){
    const { questionId } = useParams();
    const navigate = useNavigate();

    const handleAdd = (event) => {
        // do the real add....
        navigate(`/answers/${questionId}`);
    };

    const handleCancel = (event) => {
        // go back to the list of answers, to questionId
        navigate(`/answers/${questionId}`);
    };

    return <div>
        <p>ADD ANSWER TO QUESTION {questionId}</p>
        <p>
            <button onClick={handleAdd}>ADD</button>
            <button onClick={handleCancel}>CANCEL</button>
        </p>
    </div>;
}

export { AddAnswer } ;