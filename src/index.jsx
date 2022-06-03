import React from 'react'
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Route, Routes} from 'react-router-dom'

import {App} from './views/App'
import DoneTasks from './views/DoneTasksPage';

import './views/styles/common.scss'
import './views/styles/reset.scss'

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<App />} />
                <Route path='/done' element={<DoneTasks />} />
            </Routes>
        </BrowserRouter>
    </React.StrictMode>
)