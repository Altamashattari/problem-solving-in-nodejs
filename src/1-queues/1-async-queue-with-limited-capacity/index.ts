/**
 * Implement an async request queue which can process three requests at a time
 */

import Queue from "..";

export type AsyncRequest = (done: () => void) => unknown;

class AsyncQueue extends Queue<AsyncRequest> {
    private capacity: number;
    private runningCount: number;

    constructor(capacity: number = 3, requests?: AsyncRequest[]) {
        super(true);
        this.capacity = capacity;
        this.runningCount = 0;
        this.initRequests(requests);
    }

    public push(req: AsyncRequest) {
        if (this.runningCount < this.capacity) {
            this.runningCount += 1;
            req(this.onAsyncRequestComplete.bind(this));
            return;
        }
        this.enqueue(req);
        
    } 

    private initRequests(requests?: AsyncRequest[]) {
        const len = requests?.length ?? 0;

        // if array is empty or undefined
        if (len === 0) {
            return;
        }
        // else
        let i = 0;
        // execute all requests before capacity is reached
        for(; i < this.capacity && i < len; i++) {
            requests![i](this.onAsyncRequestComplete.bind(this));
        }
        // push remaining requests to the queue
        if(len > i) {
            this.runningCount = this.capacity;
            requests!
                .slice(i)
                .forEach(
                    req => this.enqueue(req)
                );
        }
    }


    private onAsyncRequestComplete() {
        const next = this.deque();
        this.runningCount--;
        if (next) {
            this.runningCount += 1;
            next(this.onAsyncRequestComplete.bind(this))
        }
    }
}

export default AsyncQueue;