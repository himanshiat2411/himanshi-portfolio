import { useCallback, useState } from 'react';

import Footer from './components/Footer';
import Hero from './components/Hero';
import Intro from './components/Intro';
import Navbar from './components/Navbar';
import Preloader from './components/Preloader';
import SelectedWork from './components/SelectedWork';

const App = () => {
  const [loading, setLoading] = useState(true);
  const finish = useCallback(() => setLoading(false), []);

  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <Intro />
        <SelectedWork />
      </main>
      <Footer />
      {loading && <Preloader onDone={finish} />}
    </>
  );
};

export default App;
