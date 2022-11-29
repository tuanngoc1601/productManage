import React from 'react';
import { Routes, Route } from 'react-router-dom';
// import pages
import User from './page/User';
import Admin from './page/Admin';
import Error from './page/Error';
import About from './page/About';
import SingleProduct from './page/SingleProduct';
// import component
import Navbar from './components/Navbar';

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={ <User /> }/>
                <Route path="/admin" element={ <Admin /> }/>
                <Route path="/about" element={ <About /> }/>
                <Route path="/products/:id" element={ <SingleProduct /> } />
                <Route path="/error" element={ <Error /> }/>
            </Routes>
        </>
    );
}

export default App;
