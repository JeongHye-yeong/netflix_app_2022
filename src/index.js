import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
//BrowserRouter - html5 history API를 사용해 ui를 url과 동기화된 상태 유지해주며,
//기존에는 원래는 app에서 사용했지만 기존보다 조금더 확장을 시키기 위해 index.js를 사용해줬음 

