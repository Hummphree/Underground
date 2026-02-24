import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Home';
import ArtistGallery from './ArtistGallery';
import Contact from './Contact';
import Scheduling from './Scheduling';
import Events from './Events';
import Aftercare from './Aftercare';
import ScrollToHash from './components/ScrollToHash';

function App() {
  return (
    <Layout>
      <ScrollToHash />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/artist/:id" element={<ArtistGallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scheduling" element={<Scheduling />} />
        <Route path="/aftercare" element={<Aftercare />} />
      </Routes>
    </Layout>
  );
}

export default App;
