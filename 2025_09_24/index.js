// const readline = require('node:readline').createInterface({ // readline nie działa :(
//     input: process.stdin,
//     output: process.stdout,
// });

const prompt = require('prompt-sync')({'sigint':true});

function add(a, b)
{
    return a + b;
}
function subtract(a, b)
{
    return a - b;
}
function multiply(a, b)
{
    return a * b;
}
function divide(a, b)
{
    return a / b;
}

const operations = {
    '1': add,
    '2': subtract,
    '3': multiply,
    '4': divide
}

while(true)
{
    // let a;
    // readline.question("Insert the first number: ", output =>{
    //     a = output;
    //     readline.close();
    // });
    // let b; readline.question("Insert the second number: ", output => {
    //     b = output;
    //     readline.close();
    // });

    console.clear();
    let a = prompt("Insert the first number: ")
    let b = prompt("Insert the second number: ")

    console.log("Choose one of the operations: ")
    console.log("1. Add")
    console.log("2. Subtract")
    console.log("3. Multiply")
    console.log("4. Divide")

    let choice = prompt();
    // readline.question("", output => {
    //     choice = output;
    //     readline.close();
    // })

    console.log(typeof choice);
    console.log(operations)
    console.log(operations[choice](a, b));

    let fs = require('fs')

    function getChar() {
        let buffer = Buffer.alloc(1)
        fs.readSync(0, buffer, 0, 1)
        return buffer.toString('utf8')
    }
    console.log("Exit now? (y/n): ")
    let exit_choice = getChar()

    if (exit_choice.toLowerCase() == 'n')
    {
        break;
    }


}