import { Task } from './Task'

export class TaskStack {
  stack: Task[]

  constructor(init?: Task[]) {
    this.stack = init ?? []
  }

  push(...tasks: Task[]) {
    this.stack.push(...tasks)
  }

  pop() {
    return this.stack.pop()
  }

  *[Symbol.iterator]() {
    return this.stack[Symbol.iterator]()
  }

  get top(): Task | undefined {
    return this.stack[this.length - 1]
  }

  get length(): number {
    return this.stack.length
  }

  get isEmpty(): boolean {
    return this.length === 0
  }

  get isNotEmpty(): boolean {
    return !this.isEmpty
  }
}
