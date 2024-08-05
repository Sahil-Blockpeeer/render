import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Checkpage from './pages/Checkpage';
// import Connect from './components/Web3auth.jsx';
import ConnectWallet from './components/Connectwallet';
import ConfigPage from './pages/ConfigPage';
import CreateProNotePage from './pages/CreateProNotePage';

function App() {
  return (
    <Router>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <div style={{ marginLeft: '250px', padding: '20px', width: '100%' }}>
          <h1>Promissory Note</h1>
          {/* <ConnectWallet /> */}
          {/* <Connect/> */}
          <Routes>
            <Route path="/config" element={<ConfigPage />} />
            <Route path="/checkpage" element={<Checkpage />} />
            <Route path="/create-pro-note" element={<CreateProNotePage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
