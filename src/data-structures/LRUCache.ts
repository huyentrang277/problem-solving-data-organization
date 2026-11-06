class Node<K, V> {
    key: K;
    value: V;
    prev: Node<K, V> | null = null;
    next: Node<K, V> | null = null;

    constructor(key: K, value: V) {
        this.key = key;
        this.value = value;
    }
}

export class LRUCache<K, V> {
    private cache = new Map<K, Node<K, V>>();
    private head: Node<K, V>;
    private tail: Node<K, V>;

    constructor(private readonly capacity: number) {
        if (!Number.isInteger(capacity) || capacity <= 0) {
            throw new Error("Capacity phải là số nguyên dương.");
        }

        // Hai nút giả để đơn giản hóa thao tác thêm/xóa.
        this.head = new Node<K, V>(null as K, null as V);
        this.tail = new Node<K, V>(null as K, null as V);

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }

    private removeNode(node: Node<K, V>): void {
        const previous = node.prev!;
        const next = node.next!;

        previous.next = next;
        next.prev = previous;
    }

    private addToTail(node: Node<K, V>): void {
        const previous = this.tail.prev!;

        previous.next = node;
        node.prev = previous;

        node.next = this.tail;
        this.tail.prev = node;
    }

    private moveToMostRecent(node: Node<K, V>): void {
        this.removeNode(node);
        this.addToTail(node);
    }

    get(key: K): V | undefined {
        const node = this.cache.get(key);

        if (!node) {
            return undefined;
        }

        this.moveToMostRecent(node);

        return node.value;
    }

    put(key: K, value: V): void {
        const existingNode = this.cache.get(key);

        if (existingNode) {
            existingNode.value = value;
            this.moveToMostRecent(existingNode);
            return;
        }

        const newNode = new Node(key, value);

        this.cache.set(key, newNode);
        this.addToTail(newNode);

        if (this.cache.size > this.capacity) {
            const leastRecent = this.head.next!;

            this.removeNode(leastRecent);
            this.cache.delete(leastRecent.key);
        }
    }

    delete(key: K): boolean {
        const node = this.cache.get(key);

        if (!node) {
            return false;
        }

        this.removeNode(node);
        this.cache.delete(key);

        return true;
    }

    has(key: K): boolean {
        return this.cache.has(key);
    }

    getSize(): number {
        return this.cache.size;
    }

    getKeys(): K[] {
        const keys: K[] = [];
        let current = this.head.next;

        while (current && current !== this.tail) {
            keys.push(current.key);
            current = current.next;
        }

        return keys;
    }

    clear(): void {
        this.cache.clear();

        this.head.next = this.tail;
        this.tail.prev = this.head;
    }
}