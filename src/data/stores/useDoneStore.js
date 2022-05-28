import create from 'zustand'

import {generateId, getTime} from '../helpers';
import {devtools} from 'zustand/middleware';


function isToDoStore () {
    return 'doneTasks'
}

// localStorageUpdate is middleware

const localStorageUpdate = (config) => (set, get, api) => config((nextState, ...args) => {
    if (isToDoStore(nextState)) {
        window.localStorage.setItem('doneTasks', JSON.stringify(
            nextState.tasks
        ))
    }
    set(nextState, ...args)
}, get, api)

const getCurrentDoneState = () => {
    try {
        return JSON.parse(window.localStorage.getItem('doneTasks') || '[]' );
    } catch (err) {
        window.localStorage.setItem('doneTasks', '[]')
        alert(err)
    }

    return []

}

export const useDoneStore = create(localStorageUpdate(devtools((set, get) => ({
    doneTasks: getCurrentDoneState(),
    // добавление таски в donetask
    addDoneTask: (id, title, createdAt) => {
        const {doneTasks} = get()

        const task = {
            id,
            title,
            createdAt,
            doneAt: getTime()
        }

        set({
            tasks: [task].concat(doneTasks)
        })

        console.log(doneTasks)
    },
    // удаление таски из donetask
    deleteDoneTask: (id) => {
        const {doneTasks} = get()
        if (window.confirm('Are you sure?')) {
            set({
                doneTasks: doneTasks.filter(task => task.id !== id)
            })
        }
    }
}))))