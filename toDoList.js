import fs from "fs";
import readline from "readline-sync";

const filePath = 'todos.json';

function loadTodos() {
    if(!fs.existsSync(filePath)) return [];
    const data = fs.readFileSync(filePath,'utf8');
    return JSON.parse(data);
}

function saveTodos(todos) {
    fs.writeFileSync(filePath,JSON.stringify(todos,null,2));
}

function startApp(){
    while(true){
        console.log("\n ---Task management application---");
        console.log("1. View tasks");
        console.log("2. Add a new task");
        console.log("3. Exit");

        const choice = Number(readline.question("Choose a number :")) ;
        
        switch (choice) {
            case 1:
                const todos = loadTodos();
                console.log("\n ---Your current tasks---");
                if(todos.length===0) console.log("No tasks yet!");
                todos.forEach((todo, index) => {console.log(`${index + 1}. [${todo.done ? '✔' : ' '}] ${todo.task}`);
                });
                break;
            case 2:
                const task = readline.question("Enter the new task: ");
                const todo =loadTodos();
                todo.push({task: task , done : false});
                saveTodos(todo);
                console.log("Task added successfully!");
                break;
            case 3:
                console.log("good bye !");
                process.exit(0);
            default:
                console.log('Incorrect choice, try again.');
                
        }
    }
    
}

startApp();

