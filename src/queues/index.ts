export class QNode<T> {
    public data: T;
    public next: QNode<T> | null;

    constructor(data: T, next: QNode<T> | null = null) {
        this.data = data;
        this.next = next;
    }
}

class Queue<T> {
    private head: QNode<T> | null;
    private tail: QNode<T> | null;
    public length: number;
    public printOnMutation: boolean;

    constructor(printOnMutation: boolean = false) {
        this.head = null;
        this.tail = null;
        this.length = 0;
        this.printOnMutation = printOnMutation;
    }

    enqueue(data: T) {
        this.length += 1;
        const newNode = new QNode(data);
        if (this.tail === null) {
            this.head = this.tail = newNode;
            return;
        }

        this.tail.next = newNode;
        this.tail = newNode;
        this.printOnMutation && this.print();
    }

    deque(): T | null {
        if (this.head === null) {
            return null;
        }
        const nodeToRemove = this.head;
        const next = nodeToRemove.next;
        nodeToRemove.next = null;
        this.head = next;
        this.length -= 1;
        this.printOnMutation && this.print();
        return nodeToRemove.data;
    }

    private print() {
        console.log("-------------------");
        let temp = this.head;
        while(temp) {
            console.log(temp.data);
            temp = temp.next;
        }
    }
}

export default Queue;