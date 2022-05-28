import React from 'react'

import styles from './index.module.scss'

export const DoneTaskTemplate = ({id, title, createdAt, doneAt, deleteDoneTask}) => {


    return <div className={styles.template}>

        <div className={styles.templateTitle}>Task:
            <h2 className={styles.templateTitleText}>{title}</h2>
        </div>

        <div className={styles.templateTime}>
            <div className={styles.templateCreatedAt}>Created: {createdAt}</div>
            <div className={styles.templateDoneAt}>Done: {doneAt}</div>
            {/*<input type='button' onClick={deleteDoneTask}/>*/}
        </div>
    </div>
}