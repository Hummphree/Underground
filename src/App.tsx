import { useState, useCallback } from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Preloader from './components/Preloader';
import Home from './Home';
import ArtistGallery from './ArtistGallery';
import Contact from './Contact';
import Scheduling from './Scheduling';
import Events from './Events';
import Aftercare from './Aftercare';
import ConsentForm from './ConsentForm';
import ScrollToHash from './components/ScrollToHash';

function App() {
  const [isPreloaderComplete, setIsPreloaderComplete] = useState(false);
  const [isTransitionStarted, setIsTransitionStarted] = useState(false);

  const handleTransitionStart = useCallback(() => {
    setIsTransitionStarted(true);
  }, []);

  const handlePreloaderComplete = useCallback(() => {
    setIsPreloaderComplete(true);
  }, []);

  return (
    <>
      {!isPreloaderComplete && (
        <Preloader
          onTransitionStart={handleTransitionStart}
          onComplete={handlePreloaderComplete}
        />
      )}
      <div className="relative w-full">
        <Layout isTransitionStarted={isTransitionStarted}>
          <ScrollToHash />
          <Routes>
            <Route path="/" element={<Home isTransitionStarted={isTransitionStarted} />} />
            <Route path="/events" element={<Events />} />
            <Route path="/artist/:id" element={<ArtistGallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/scheduling" element={<Scheduling />} />
            <Route path="/aftercare" element={<Aftercare />} />
            <Route path="/consent" element={<ConsentForm />} />
          </Routes>
        </Layout>
      </div>
    </>
  );
}

export default App;
