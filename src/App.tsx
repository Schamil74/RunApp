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
            <main className="app__main app-main">
                <div className="app__container container">
                    <Main />
                </div>
            </main>
            <footer className="app__footer app-header">
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
