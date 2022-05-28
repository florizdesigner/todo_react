import React, {useEffect, useRef, useState} from 'react'

import styles from './index.module.scss'


export const TaskTemplate = ({id, title, createdAt, onDone, onRemove, onEdited}) => {

    const [checked, setChecked] = useState(false)
    const [isEditMode, setIsEditMode] = useState(false)
    const [value, setValue] = useState(title)
    const editTitleInputRef = useRef(null)
    const [disabledCheck, setDisabledCheck] = useState(false)

    useEffect(() => {
        if (isEditMode) {
            editTitleInputRef?.current?.focus()
        }
    }, [isEditMode])

    return <div className={styles.template}>
        <div className={styles.templateInputCheck}>
            <input type='checkbox'
                   checked={checked}
                   className={styles.templateCheckbox}
                   disabled={disabledCheck}
                   onChange={(e) => {
                       setChecked(e.target.checked)
                       if (e.target.checked) {
                           setDisabledCheck(true)
                           setTimeout(() => {
                               onDone(id, title, createdAt)
                               onRemove(id)
                           }, 500)
                       }
                   }}/>
        </div>

        {isEditMode ?
            <input onKeyDown={e => {
                if (e.key === 'Enter') {
                    onEdited(id, value)
                    setIsEditMode(!isEditMode)
                    setDisabledCheck(!disabledCheck)

                }
            }} className={styles.templateTitleEdit}
                   value={value}
                   ref={editTitleInputRef}
                   onChange={(e) => setValue(e.target.value)}/> :
            <div className={styles.templateTitle} onClick={() => {

            }}>{title}</div>}
        <div className={styles.templateButtons}>
            <input type='button'
                   className={isEditMode ? styles.templateButtonsDone : styles.templateButtonsEdit}
                   onClick={() => {
                       setDisabledCheck(!disabledCheck)
                       setIsEditMode(!isEditMode)
                       if (isEditMode) {
                           onEdited(id, value)
                       }
                   }}/>
            <input type='button' className={styles.templateButtonsDelete} onClick={() => {
                if (window.confirm('YES?')) {
                    onRemove(id)
                }
            }}/>
        </div>
    </div>
}