type Comparator<T> = (a: T, b: T) => number;

export class PriorityQueue<T> {
  private items: T[] = [];
  constructor(private compare: Comparator<T>) {}
  enqueue(item: T) {
    this.items.push(item);
    this.items.sort(this.compare);
  }

  dequeue(): T | undefined { return this.items.shift(); }
  isEmpty() { return this.items.length === 0; }

  drain(): T[] {
    const all = [...this.items];
    this.items = [];
    return all;
  }
}