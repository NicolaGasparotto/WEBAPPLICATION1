## /
 - Layout, Navbar
 - List of question
    - SELECT -> go to answers/:questionId

## /answers/:questinoId  
 
 - Layout, Navbar
 - Info about the question 
 - List of answers (there is no need to change page for all the actions, navigate anymore)
    - DELETE -> delete answer
    - VOTE -> change vote
    - EDIT -> go to /editAnswer/:questionId/:answerId
 - GO BACK / EXIT -> go to /
 - ADD -> go to /addAnswer/:questionId 

## /addAnswer/:questionId
 
 - Layout, Navbar
 - ( ?? list of answes? with buttons? ... )
 - Answer Form
    - ADD -> add to the state, then go to /answers/:questionId
    - CANCEL -> go to /answers/:questionId

## /editAnswer/:questionId/:answerId

 - Layout, Navbar
 - Answer Form, initialized with the current value of answerId
    - SAVE -> modify inside state, then go to /answers/:questionId
    - CANCEL -> go to /answers/:questionId
    