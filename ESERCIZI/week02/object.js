'use strict';

const response = { text: 'abcabacbab', score: 5 };

function createResponse(text, score){
    const obj = {
        text: text,
        score: score
    }

    obj.increaseScore = () => { obj.score = obj.score + 1 }

    return obj
}

// no new required;
const r1 = createResponse('xyz', 3);
const r2 = createResponse('abc', 2);

console.log(r1, r2);
r1.increaseScore(); //function relative only to the specific created object
console.log(r1, r2);



//// SAME THING BUT WITH THE CONSTRUCTION FUNCTION

// maius nelle construction Function so ci si ricorda di chiamare la funct CON NEW nameFunct()
function Response(text, score){
    this.text = text;
    this.score = score;
    this.increaseScore = () => {this.score++;};
}

const r3 = new Response('sss', 1);
console.log(r3);
r3.increaseScore();
console.log(r3);

