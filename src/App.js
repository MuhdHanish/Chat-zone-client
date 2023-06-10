import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './pages/HomePage';
import ChatPage from './pages/ChatPage';

function App() {
  return (
   <>
   <Routes>
    <Route path='/' exact element={<HomePage/>} />
    <Route path='/chat' element={<ChatPage/>} />
   </Routes>
   </>
  );
}

export default App;
