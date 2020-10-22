import React, { FC } from 'react'
import Main from './pages/main'

const App: FC = () => {
    return (
        <>
            <header className="app__header app-header">
                <div className="app__container container">
                    <h1>RunApp</h1>
                </div>
            </header>
            <div className="app__main app-main">
                <div className="app__container container">
                    <Main />
                </div>
            </div>
            <footer className="app__footer app-footer">
                <div className="app__container container">
                    <address className="app__author">
                        <a
                            rel="author"
                            href="https://kot6eremot.tk/"
                            target="_blank"
                        >
                            React Developer Minibaev Shamil
                        </a>
                    </address>
                </div>
            </footer>
        </>
    )
}

export default App
