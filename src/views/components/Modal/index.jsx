import React from 'react';

import styles from './index.module.scss'

const Modal = ({active, setActive}) => {
    return (
        <div>
            {active ? <div className={styles.modalWrapper}>
                <div className={styles.modalContent}>
                    <h1 className={styles.modalContentTitle}>Идет перенаправление на сайт</h1>
                    <p className={styles.modalContentText}>Пожалуйста, подождите</p>
                    <div className={styles.pulse}></div>
                </div>
            </div> : <div></div>}

        </div>
    );
};

export default Modal;