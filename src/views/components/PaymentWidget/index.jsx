import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

import Modal from '../Modal';

import styles from './index.module.scss'

const PaymentWidget = () => {
    const [modalActive, setModalActive] = useState(false)

    const [payment, setPayment] = useState({
        'amount': {
            'value': '1.00',
            'currency': 'RUB'
        },
        'description': 'initialstate', // берем из инпутов!!
        'save_payment_method': true, // берем из инпутов по подписке в своей форме!!
        'confirmation': {
            'type': 'redirect',
            'return_url': 'https://todolistbyfloriz.netlify.app/' // добавить успешную страницу для донатов типа спасибочки и тд
        }
    })

    const [recurring, setRecurring] = useState(false)
    const [amount, setAmount] = useState(0)
    const [description, setDescription] = useState('')

    // try {
    //     const checkout = window.YooMoneyCheckout(54401, { language: "ru" })
    // } catch (err) {
    //     alert(err)
    // }

    const checkout = window.YooMoneyCheckout(54401, {language: 'ru'})

    const baseURL = 'https://api.yookassa.ru/v3/payments'

    useEffect(() => {
        const b = document.getElementById('pay')
        if (amount > 0) {
            b.removeAttribute('disabled')
        } else {
            b.setAttribute('disabled', '')
        }
    }, [amount])

    return (
        <div className={styles.wrapper}>
            <div className={styles.form}>
                <h2 className={styles.formTitle}>Донаты</h2>
                <div className={styles.formInputs}>
                    <input type='number' placeholder='Введите сумму пожертвования' onChange={(e) =>
                        setAmount(e.target.value)
                    }/>
                    <input type='text' id='description' value={description}
                           onChange={(e) => setDescription(e.target.value)} placeholder='Введите добрые слова :)'/>
                    <div>
                        <input type='checkbox' checked={recurring} onChange={() => setRecurring(!recurring)}
                               id='savedTrue'/>
                        <label htmlFor='savedTrue'>Разрешить списания и жертвовать {amount} рублей раз в месяц</label>
                    </div>
                </div>

                <input type='button' className={styles.formBtn} id='pay' value='Пожертвовать' onClick={() => {
                    setPayment(payment.save_payment_method = recurring, payment.description = description, payment.amount.value = `${amount}.00`)
                    axios.post(baseURL, payment, {
                        headers: {
                            'Idempotence-Key': uuidv4(),
                            'Content-Type': 'application/json'
                        },
                        auth: {
                            username: '54401',
                            password: 'test_Fh8hUAVVBGUGbjmlzba6TB0iyUbos_lueTHE-axOwM0'
                        }
                    }).then(
                        resp => {
                            setModalActive(true)

                            setTimeout(() => {
                                document.location.href = resp.data.confirmation.confirmation_url
                            }, 5000)
                        }
                    )
                }}
                />
            </div>
            <Modal active={modalActive} setActive={setModalActive}/>
        </div>
    );
};

export default PaymentWidget;