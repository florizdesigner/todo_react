import React, {useCallback, useState} from 'react'

import styles from './index.module.scss'

export const InputPlus = ({onAdd}) => {
    const [inputValue, setInputValue] = useState('')
    const addTask = useCallback(() => {
        onAdd(inputValue)
        setInputValue('')
    }, [inputValue])

    return (
        <div className={styles.inputPlus}>
            <input type='text' placeholder='type text..' className={styles.inputPlusValue}
                   value={inputValue} onChange={(e) => {setInputValue(e.target.value)}}
                   onKeyDown={(e) => {
                       if(e.key === 'Enter') {
                           addTask()
                       }
                   }}
            />
            <button onClick={addTask} aria-label='Add' className={styles.inputPlusButton}/>
        </div>
    )
}