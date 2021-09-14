import React from 'react';
import ReactDOM from 'react-dom';
import { AuthProvider } from './domains/auth';
import "./index.css";
import { Marketplace } from './pages/marketplace';

ReactDOM.render(
  <AuthProvider>
    <Marketplace />
  </AuthProvider>,
  document.getElementById('root')
);

