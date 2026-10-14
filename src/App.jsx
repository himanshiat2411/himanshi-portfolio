import { useCallback, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import FeedbackWidget from './components/FeedbackWidget';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import ScrollFade from './components/ScrollFade';
import ScrollManager from './components/ScrollManager';
import About from './pages/About';
import Feedback from './pages/Feedback';
import Finworld from './pages/Finworld';
import GrubNGrab from './pages/GrubNGrab';
import Home from './pages/Home';
import IntroLoop from './pages/IntroLoop';
import Takshila from './pages/Takshila';

const App = () => {
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);
  const { pathname } = useLocation();

  // Looping case study intros for the Selected work tiles: just the animation, no site chrome.
  if (pathname.startsWith('/loop/')) {
    return (
      <Routes>
        <Route path="/loop/:slug" element={<IntroLoop />} />
      </Routes>
    );
  }

  return (
    <>
      <ScrollManager />
      <ScrollFade />
      <Navbar />
      <main id="top">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/work/takshila" element={<Takshila />} />
          <Route path="/work/finworld" element={<Finworld />} />
          <Route path="/work/grub-n-grab" element={<GrubNGrab />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </main>
      <Footer />
      <FeedbackWidget />
      {loading && <Preloader onDone={finish} />}
    </>
  );
};

export default App;
