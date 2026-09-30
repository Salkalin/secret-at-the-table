import { Routes, Route, useLocation } from 'react-router-dom';
import RainBackground from './RainBackground';
import Landing from './views/Landing';
import Login from './views/Login';
import Admin from './views/Admin';
import Host from './views/Host';
import Screen from './views/Screen';
import Play from './views/Play';

export default function App() {
  const location = useLocation();
  const isLanding = location.pathname === '/';

  return (
    <>
      {!isLanding && <RainBackground />}
      <div className="relative" style={{ zIndex: 1 }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/host" element={<Host />} />
          <Route path="/screen/:code" element={<Screen />} />
          <Route path="/play/:code" element={<Play />} />
        </Routes>
      </div>
    </>
  );
}