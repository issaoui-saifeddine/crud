import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Wrapper from './context/GlobalWrapper';
import { ChakraProvider } from "@chakra-ui/react";  // Assurez-vous d'importer ChakraProvider si nécessaire

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ChakraProvider>
    <Wrapper>
      <App />
    </Wrapper>
  </ChakraProvider>
);
