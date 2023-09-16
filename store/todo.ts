import { defineStore } from 'pinia'
import { v4 as uuid } from 'uuid'

export interface Todo {
  id: string;
  label: string;
  done: boolean;
  createdAt: Date
  updatedAt: Date
}

export type Todos = Todo[] | undefined[];

export interface TodoAdd {
  title: string
}

export interface TodoUpdate {
  title?: string,
  done?: boolean
}

export interface TodoState {
  items: Todo[] | undefined[]
}

const state = (): TodoState => ({
  items: []
})

// @ts-ignore
const getters = {
  getById: (state: TodoState) => (id: string) => {
    // @ts-ignore
    return state.items?.find ((item: Todo) => item?.id === id)
  },
  getTodoById: (state: TodoState) => {
    return (id: string) =>
      state.items.find((item) => !!item && (item as Todo).id === id);
  },
  getOrderedTodos: (state: TodoState) => {
    // @ts-ignore
    return [...state.items]?.sort((a: Todo, b: Todo) => {
      // @ts-ignore
      return a.createdAt.getTime() - b.createdAt.getTime()
    })
  }
}

const actions = {
  add(partialTodo: TodoAdd) {
    const todo: Todo  = {
      id: uuid(),
      ...partialTodo,
      done: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
    this.items.push(todo)
  },
  remove (id: string) {
    this.items = this.items.filter((todo: Todo) => todo.id !== id)
  },
  update (id: string, update: TodoUpdate) {
    const index = this.items.findIndex((item: Todo) => item.id === id)
    this.items[index] = {
      ...this.items[index],
      ...update,
      updatedAt: new Date()
    }
  }
}

export const useTodoStore = defineStore('todoStore', {
  state,
  getters,
  actions
})