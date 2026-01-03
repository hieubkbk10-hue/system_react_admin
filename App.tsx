import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { ModuleManagement } from './pages/ModuleManagement';
import { PostsModuleConfig } from './pages/modules/PostsModuleConfig';
import { AnalyticsIntegrations } from './pages/Integrations';
import { SEOConfig } from './pages/Config';

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* Dashboard */}
          <Route index element={<Overview />} />
          
          {/* Module Management */}
          <Route path="modules" element={<ModuleManagement />} />
          <Route path="modules/posts" element={<PostsModuleConfig />} />

          {/* System Config */}
          <Route path="integrations" element={<AnalyticsIntegrations />} />
          <Route path="seo" element={<SEOConfig />} />

          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default App;