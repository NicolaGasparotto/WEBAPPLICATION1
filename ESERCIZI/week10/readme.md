IN THIS CASE WE ARE ON THE SERVER SIDE -> express is for the server
in the future this system will co operate with the other part of the application in react 
that is on the client side.

DAO -> Data Access Object
The development of a webserver is an incremental job, so is better to have a documentation as a guide:

- Create a new Question 
        
        POST /questions
        body: Question object ( json representation )

- Get the list of all questions ( with full details )

    GET /questions

    Response: array of Question objects ( json seraliazation of the objects ) 

- ( Get the list of ID of the questions )
- ( Get the full details of a question, given the id )

- Get the list of all answers ( with full details ) to a specific question

    GET /questions/:questionId/answers

    Response: array of Answer objects ( json seraliazation of the objects ) 

- Create a new answer and add it to a specific question

    GET /answers/:answerId
    Request body: a single Answer Object 

- Delete an answer from a question

    DELETE /answers/:answerId
    DELETE /questions/:questionId/answers/:answerId --> overkill -> too much info needed
    // four segments are really too much ( is better to define it in another simpler way )

- Update the content of an exisitng answer ( keeping it in the same quesiton ) 

    PUT /answers/:answerId (post to add sometingh new, put to udpate an Object )
    Request body: a single Answer Object
    ( id, score, question id will not be modified --> we have to modifiy only a part of the objcet )

- Vote an answer 

    // THIS WILL CREATE A REACE CONDITION if we have at least two concurrent clients
    // it will create inconsistency in the data
    PUT /answers/:answerId/score  //it must be a differnt path from the previous one
    Request body: objcet containing a new score

    or: ( the second alternative is the correct one )
        ( the increment will be done in the server not in the client, so is MANDATORY ) 
    PUT /answers/:answerId/vote
    Request boyd: "up" ( or "down" )  // the server must do the increment 


:TYPES OF ENTITIES:
[ we have to arrange the json implementation of the entities ]

-- Question
   { id, text, author, date}
   ( id, text and author are strings )
   ( on creation, id should not provided )
   ( date is a ISO-formatted string )


-- Answer
   { id, text, author, score, date }
   ( ... same as above ... )
   ( score is a number )
 
