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
    if (b == 0)
    {
        console.error("You can't divide by 0!")
    }
    else
    {
        return a / b;
    }
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
    // input numbers to calculate
    let a = parseFloat(prompt("Insert the first number: "))
    let b = parseFloat(prompt("Insert the second number: "))

    console.log("Avaiable options: ")
    console.log("=================");
    console.log("1. Add")
    console.log("2. Subtract")
    console.log("3. Multiply")
    console.log("4. Divide")

    let choice = prompt("Choose one of the operations: ");

    // readline.question("", output => {
    //     choice = output;
    //     readline.close();
    // })

    // calculate and display the result
    let result = operations[choice](a, b);
    console.log(`The result is ${result}`);

    // check if the result is a lucky number
    if (result in [69,420,2137])
    {
        console.log("\nThis should be your lucky number!\n");
    }

    // ask the user if the program should run again
    let exit_choice = prompt("Do you want to play again? (y/n): ")

    if (exit_choice.toLowerCase() != 'y')
    {
        break;
    }
}