import readline from 'readline';

import { AsyncQueueExample } from "./queues/1-async-queue-with-limited-capacity/example";

const questions: Record<string, () => void> = {
    'async-queue-with-limited-capacity': AsyncQueueExample,
};

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const question = `\n\nType below options to run a specific program:

    ${Object.keys(questions)
        .reduce((q, current) => q + '\n' + current + '\n\n\n', '')}
`;

const ask = () => {
    rl.question(
        question,
        answer => {
            if (questions[answer]) {
                questions[answer]();
            } else {
                console.log('Please type valid option :(');
            }
            ask();
        });
}

ask();




