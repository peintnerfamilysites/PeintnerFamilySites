import { Route, Routes } from 'react-router-dom';
import { NavBar } from './components/navigation/NavBar';
import { AppErrorBoundary } from './components/routing/AppErrorBoundary';
import { ScrollToTop } from './components/routing/ScrollToTop';
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { WorkPage } from './pages/WorkPage';
import { ProcessPage } from './pages/ProcessPage';
import { ContactPage } from './pages/ContactPage';
import { NotFoundPage } from './pages/NotFoundPage';
import { TermsOfUsePage } from './pages/TermsOfUsePage';
import { Footer } from './sections/Footer';

export default function App() {
  return (
    <div className="app">
      <ScrollToTop />
      <NavBar />
      <main>
        <AppErrorBoundary>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/services" element={<ServicesPage />} />
            <Route path="/work" element={<WorkPage />} />
            <Route path="/process" element={<ProcessPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/terms" element={<TermsOfUsePage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </AppErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}
