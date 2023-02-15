import * as  inquirer from 'inquirer';
import { AsyncQueueExample } from "./queues/1-async-queue-with-limited-capacity/example";
import fileUploader from './file-uploader';

const questions: Record<string, () => void> = {
    'async-queue-with-limited-capacity': AsyncQueueExample,
    'file-uploader': fileUploader,
};

const prompt = () => {
    inquirer.default
        .prompt([{
            type: 'rawlist',
            name: 'program',
            message: 'Select program to run',
            choices: ["exit", ...Object.keys(questions)]
        }])
        .then((answer) => {
            if (answer.program === "exit") {
                return process.exit();
            }
            questions[answer.program]();
        });
}

prompt();






