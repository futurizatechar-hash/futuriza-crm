import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import ProblemSolution from './sections/ProblemSolution';
import Authority from './sections/Authority';
import SuccessStories from './sections/SuccessStories';
import LeadForm from './sections/LeadForm';
import Footer from './components/Footer';
import CrmDashboard from './sections/CrmDashboard';
import Login from './sections/Login';
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-200">
      <Navbar />
      <main>
        <Hero />
        <ProblemSolution />
        <Authority />
        <SuccessStories />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
}

function App() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/crm" element={session ? <CrmDashboard /> : <Login />} />
      </Routes>
    </Router>
  );
}

export default App;
