import React from 'react';

import styles from './index.module.scss'
import {DoneTaskTemplate} from '../components/DoneTaskTemplate';
import {useDoneStore} from '../../data/stores/useDoneStore';
import {Link} from 'react-router-dom';

const DoneTasksPage = () => {

    const doneTasks = useDoneStore(state => state.doneTasks)

    return (
        <div>
            <div className={styles.navbar}>
                <Link to='/'>Open issues</Link>
            </div>

            <article className={styles.article}>
                {doneTasks.map(task => {
                    if (task != null) {
                        if (task.id != null) {
                            return <DoneTaskTemplate key={task.id} id={task.id} title={task.title}
                                                     createdAt={task.createdAt}
                                                     doneAt={task.doneAt}/>
                        }
                        else {
                            return <div>Error (task.id is null)! Task: {task.title}</div>
                        }
                    } else {
                        return <div>Error! Task is null</div>
                    }

                })}
            </article>
        </div>
    );
};

export default DoneTasksPage