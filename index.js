const fs = require('fs');
const path = require('path');
const readline = require('readline');

function createTask(taskDescription) {
    fs.appendFile('tasks.txt', taskDescription + '\n', (err) => {
        if (err) throw err;
        console.log('Task created successfully!');
    });
}

function listTasks() {
    const tasks = fs.readFileSync('tasks.txt', 'utf8').split('\n').filter(Boolean);
    tasks.forEach((task, index) => {
        console.log(`${index + 1}. ${task}`);
    });
}

function completeTask(taskNumber) {
    const tasks = fs.readFileSync('tasks.txt', 'utf8').split('\n').filter(Boolean);
    if (taskNumber <= tasks.length) {
        tasks[taskNumber - 1] += ' - Completed';
        fs.writeFileSync('tasks.txt', tasks.join('\n'));
        console.log('Task marked as complete!');
    } else {
        console.log('Task number does not exist.');
    }
}

function deleteTask(taskNumber) {
    const tasks = fs.readFileSync('tasks.txt', 'utf8').split('\n').filter(Boolean);
    if (taskNumber <= tasks.length) {
        tasks.splice(taskNumber - 1, 1);
        fs.writeFileSync('tasks.txt', tasks.join('\n'));
        console.log('Task removed successfully!');
    } else {
        console.log('Task number does not exist.');
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter your choice (create/list/complete/delete): ', (choice) => {
    if (choice === 'create') {
        rl.question('Enter the task: ', (taskDescription) => {
            createTask(taskDescription);
            rl.close();
        });
    } else if (choice === 'list') {
        listTasks();
        rl.close();
    } else if (choice === 'complete') {
        rl.question('Enter the task number to mark as complete: ', (taskNumber) => {
            completeTask(parseInt(taskNumber));
            rl.close();
        });
    } else if (choice === 'delete') {
        rl.question('Enter the task number to remove: ', (taskNumber) => {
            deleteTask(parseInt(taskNumber));
            rl.close();
        });
    } else {
        console.log('Invalid choice. Please try again.');
        rl.close();
    }
});