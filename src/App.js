import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Auth/login';
import Register from './Auth/register';
import Home from './components/Home';
import CategroyHome from './Category/CategoryForm'
import ItemHome from './Item/ItemAdd';
import ItemList from './Item/ItemList';
import ItemUpdate from './Item/ItemUpdate';
import DeleteItem from './Item/ItemDelete';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/home" element={<Home />} />
                <Route path='/category' element={<CategroyHome/>}/>
                <Route path='/item' element={<ItemHome/>}/>
                <Route path='/ItemList' element={<ItemList/>}/>
                <Route path='/ItemUpdate' element={<ItemUpdate/>}/>
                <Route path='/DeleteItem' element={<DeleteItem/>}/>
            </Routes>
        </Router>
    );
}

export default App;
