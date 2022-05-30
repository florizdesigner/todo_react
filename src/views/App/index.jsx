import React from 'react'
import {Link} from 'react-router-dom'

import {useToDoStore} from '../../data/stores/useToDoStore'
import {InputPlus} from '../components/InputPlus'
import {TaskTemplate} from '../components/TaskTemplate'
import {useDoneStore} from '../../data/stores/useDoneStore'

import styles from './index.module.scss'

///////////////////////////////

export const App = () => {
    const [tasks, createTask, updateTask, deleteTask] = useToDoStore(state => [
        state.tasks,
        state.createTask,
        state.updateTask,
        state.deleteTask
    ])

    const [addDoneTask, deleteDoneTask] = useDoneStore(state => [state.addDoneTask, state.deleteDoneTask])

    return (
        <div>
            <div className={styles.navbar}>
                <Link to='/done'>Resolved tasks</Link>
            </div>

            <article className={styles.article}>
                <section className={styles.articleSection}>
                    <h1 className={styles.articleTitle}>to do app</h1>
                    <InputPlus onAdd={(title) => {
                        if (title) {
                            createTask(title)
                        }
                    }}/>
                </section>
                <hr className={styles.articleLine}/>
                <section className={styles.articleSection}>
                    {(tasks.length === 0) ?
                        <div className={styles.articleText}>Тут ничего нет</div> : tasks.map(task => {
                            return <TaskTemplate key={task.id} id={task.id} title={task.title}
                                                 createdAt={task.createdAt} onDone={addDoneTask} onEdited={updateTask}
                                                 onRemove={deleteTask} onDoneRemove={deleteDoneTask}/>
                        })}
                </section>

            </article>

            <input type='button' className={styles.deleteDoneTasks} onClick={() => {
                if (window.confirm('Вы действительно хотите удалить doneTasks? Это действие необратимо и его нельзя будет отменить!')) {
                    window.localStorage.removeItem('doneTasks')
                }
            }}
                   value='delete doneTasks'/>
        </div>
    )
}