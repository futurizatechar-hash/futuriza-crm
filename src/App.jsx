import CrmDashboard from './sections/CrmDashboard';
import Login from './sections/Login';
import { supabase } from './supabaseClient';
import { useState, useEffect } from 'react';

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

  return session ? <CrmDashboard /> : <Login />;
}

export default App;
