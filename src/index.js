import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router } from 'react-router-dom';
import './index.css';
import ChatProvider from './context/ChatProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ChatProvider>
    <Router>
      <ChakraProvider>
        <App />
      </ChakraProvider>
    </Router>
    </ChatProvider>
  </React.StrictMode>
);
