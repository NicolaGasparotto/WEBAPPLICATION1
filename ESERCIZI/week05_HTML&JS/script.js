'use strict';

//Solution for Exercise 6

const myquestion = new Question('Is Javascript better than Python?', 'Luigi De Russis', '2023-01-01');

myquestion.add(new Answer('Yes', 'Luca Mannella', -10, '2023-02-15'));
myquestion.add(new Answer('Both have their pros and cons', 'Mario R0ssi', 0, '2023-03-04'));

document.addEventListener('DOMContentLoaded', (event) => {
    
    document.querySelector('p.lead').innerText = myquestion.text;
    document.getElementById('questionauthor').innerText = myquestion.author;

    const table = document.getElementById('answerstable');
    /* table: theading, tbody, tfoot -> at the end of the table by default */
    // const tableBody = tbale.childNode[1]; // Dangerous to count childre!
    const tableBody = table.querySelector('tbody'); // only the body of this specific tbale

    for(const answer of myquestion.answers){
        const tr = document.createElement('tr');
        // adding all the column with specific element One by One
        const tdDate = document.createElement('td');
        tdDate.innerText = answer.date.format('MM/DD/YYYY');
        tr.appendChild(tdDate);

        const tdText = document.createElement('td');
        tdText.innerText = answer.text;
        tr.appendChild(tdText);
        
        const tdAuthor = document.createElement('td');
        tdAuthor.innerText = answer.author;
        tr.appendChild(tdAuthor);

        const tdScore = document.createElement('td');
        tdScore.innerText = answer.score;
        tr.appendChild(tdScore);

        const tdButton = document.createElement('td');
        const voteButton = document.createElement('button');
        voteButton.innerText = 'VOTE';
        voteButton.classList.add('btn', 'btn-info'); //adding addictional info about the button to use the Bootstrap Library css implementation
        tdButton.appendChild(voteButton);
        tr.appendChild(tdButton);
        // at this point the button cannot do Anything

        /* with innerHTML is possible to concatenate and write any kind of html implementation
        // IT WAS POSSIBLE ALSO TO CREATE ALL THE html ROW WITH one LINE COMMAND 
        // --> but then is not possible to manage specific element in js or also addEvent to specific html object
        // IT'S ALSO POSSIBLE TO USE THE DEFAULT HTML PARSERER IMPLEMENTED INSIDE THE BROWSER
        const tdButton = document.createElement('td');
        tdButton.innerHTML = `<button class="btn btn-info">VOTE</button>`;
        tr.appendChild(tdButton);
        */

        // this is a specific property --> all the procedure in this way are ASYNCRONOUS. it's not possible to do syncronous
        // the webpage wait the final execution of the program. it's NOT STEP BY STEP
        // is possible to use CLOSURE
        voteButton.addEventListener('click', (event) => {
            const oldScore = Number(tdScore.innerText); // thanks to the Closure is possible to refer to the specific button obj created otherwise there wasn't the possibility to refer to the obj
            const newScore = oldScore + 1;
            tdScore.innerText = newScore;

            const theButton = event.target;
            const scoreCell = theButton.parentNode.parentNode.childNode[3];
            scoreCell.innerText = Number(scoreCell.innerText)+1;

        });

        tableBody.appendChild(tr);
    }

    //ADD A NEW ROW!!!!
    //                    >>>>> is the id of the Button
    document.querySelector('#addButton').addEventListener('click', (event)=> {
        const date = document.querySelector('input[name=date]').value; // input element 
        const text = document.querySelector('input[name=date]').value; // input element 
    });
});