import create from 'zustand'

import {generateId} from '../helpers';
import {devtools} from 'zustand/middleware';


function isToDoStore () {
    return 'tasks'
}

// localStorageUpdate is middleware

const localStorageUpdate = (config) => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('tasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args)
}, get, api)

const getCurrentState = () => {
    try {
        return JSON.parse(window.localStorage.getItem('tasks') || '[]' );
    } catch (err) {
        window.localStorage.setItem('tasks', '[]')
        alert(err)
    }

    return []

}

export const useToDoStore = create(localStorageUpdate(devtools((set, get) => ({
    tasks: getCurrentState(),
    createTask: (title) => {
        const {tasks} = get()
        const newTask = {
            id: generateId(),
            title,
            createdAt: Date.now()
        }

        set({
            tasks: [newTask].concat(tasks)
        })

        console.log(tasks)
    },
    updateTask: (id, title) => {
        const {tasks} = get()
        set({
            tasks: tasks.map(task => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    deleteTask: (id) => {
        const {tasks} = get()
        set({
            tasks: tasks.filter(task => task.id !== id)
        })
    },
}))))