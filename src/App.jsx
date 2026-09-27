import { useCallback, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollManager from './components/ScrollManager';
import Finworld from './pages/Finworld';
import GrubNGrab from './pages/GrubNGrab';
import Home from './pages/Home';

const App = () => {
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);

  return (
    <>
      <ScrollManager />
      <Navbar />
      <main id="top">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/finworld" element={<Finworld />} />
          <Route path="/work/grub-n-grab" element={<GrubNGrab />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      {loading && <Preloader onDone={finish} />}
    </>
  );
};

export default App;
