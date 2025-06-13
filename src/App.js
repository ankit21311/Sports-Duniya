import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import News from './pages/News';
import Categories from './pages/Categories';
import GamesPage from './pages/GamesPage';
import './App.css';

function App() {
    return (
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/news" element={<News/>}/>
                <Route path="/categories" element={<Categories/>}/>
                <Route path="/gaming" element={<GamesPage/>}/>
            </Routes>
        </div>
    );
}

export default App; 
