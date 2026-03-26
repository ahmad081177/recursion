import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import { AppProvider } from './store/AppContext';
import { HomeScreen } from './ui/screens/HomeScreen';
import { VisualizationScreen } from './ui/screens/VisualizationScreen';

export function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/visualize/:algorithmId" element={<VisualizationScreen />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
