import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Landing from './pages/Landing';
import Dashboard from './pages/Dashboard';
import FlowWorkspace from './pages/FlowWorkspace';
import CheatSheet from './pages/CheatSheet';
import Errors from './pages/Errors';
import Queries from './pages/Queries';

function App() {
  const [onboardingDone, setOnboardingDone] = useState(() => {
    return localStorage.getItem('onboardingDone') === 'true';
  });

  const handleOnboardingComplete = () => {
    setOnboardingDone(true);
    localStorage.setItem('onboardingDone', 'true');
  };

  return (
    <AppProvider>
      <BrowserRouter>
        {!onboardingDone && (
          <Onboarding onComplete={handleOnboardingComplete} />
        )}
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route
            path="/dashboard"
            element={
              <Layout>
                <Dashboard />
              </Layout>
            }
          />
          <Route
            path="/workspace"
            element={
              <Layout>
                <FlowWorkspace />
              </Layout>
            }
          />
          <Route
            path="/cheatsheet"
            element={
              <Layout>
                <CheatSheet />
              </Layout>
            }
          />
          <Route
            path="/errors"
            element={
              <Layout>
                <Errors />
              </Layout>
            }
          />
          <Route
            path="/queries"
            element={
              <Layout>
                <Queries />
              </Layout>
            }
          />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
