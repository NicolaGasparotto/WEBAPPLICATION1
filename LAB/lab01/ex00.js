'use strict';

// https://github.com/polito-WA1-AW1-2022/lab1-node/
// ^^^^ SOLUZIONI OFFICIALI LAB 1 21/22 ^^^^
// console.log('Hello world!');

function transformStrArr(strList){
    let tmp;
    function transformStr(str){
        if(str.length > 1)
            str = str.substring(0,2) + str.substring(str.length-2);
        else
            str = '';
        return str;
    }
    if(Array.isArray(strList)){
        strList.forEach(element => {
            tmp = transformStr(element);
            console.log(tmp);
        });
    }else{
        console.log(transformStr(strList));
    }
}

// testing function 
function main(){
    let string = 'spring';
    transformStrArr(string);
    string = ['it', 'cat', 'Code', 'a'];
    transformStrArr(string); 
}

main();
