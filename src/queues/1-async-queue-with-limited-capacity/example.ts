import AsyncQueue from ".";

export function AsyncQueueExample() {
    const req1 = (done: () => void) => {
        setTimeout(() => {
            console.log('req 1 done');
            done();
        }, 2000);
    }

    const req2 = (done: () => void) => {
        setTimeout(() => {
            console.log('req 2 done');
            done();
        }, 3000);
    }

    const req3 = (done: () => void) => {
        setTimeout(() => {
            console.log('req 3 done');
            done();
        }, 100);
    }

    const req4 = (done: () => void) => {
        setTimeout(() => {
            console.log('req 4 done');
            done();
        });
    }

    const req5 = (done: () => void) => {
        setTimeout(() => {
            console.log('req 5 done');
            done();
        }, 100);
    }

    const queue = new AsyncQueue(2, [req1, req2, req3]);
    queue.push(req4);
    queue.push(req5);
}


