import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Overview } from './pages/Overview';
import { ModuleManagement } from './pages/ModuleManagement';
import { PostsModuleConfig } from './pages/modules/PostsModuleConfig';
import { MediaModuleConfig } from './pages/modules/MediaModuleConfig';
import { ProductsModuleConfig } from './pages/modules/ProductsModuleConfig';
import { CartModuleConfig } from './pages/modules/CartModuleConfig';
import { WishlistModuleConfig } from './pages/modules/WishlistModuleConfig';
import { OrdersModuleConfig } from './pages/modules/OrdersModuleConfig';
import { CommentsModuleConfig } from './pages/modules/CommentsModuleConfig';
import { UsersModuleConfig } from './pages/modules/UsersModuleConfig';
import { CustomersModuleConfig } from './pages/modules/CustomersModuleConfig';
import { RolesModuleConfig } from './pages/modules/RolesModuleConfig';
import { SettingsModuleConfig } from './pages/modules/SettingsModuleConfig';
import { MenusModuleConfig } from './pages/modules/MenusModuleConfig';
import { HomepageModuleConfig } from './pages/modules/HomepageModuleConfig';
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
          {/* Content Modules */}
          <Route path="modules/posts" element={<PostsModuleConfig />} />
          <Route path="modules/comments" element={<CommentsModuleConfig />} />
          <Route path="modules/media" element={<MediaModuleConfig />} />
          {/* Commerce Modules */}
          <Route path="modules/products" element={<ProductsModuleConfig />} />
          <Route path="modules/cart" element={<CartModuleConfig />} />
          <Route path="modules/wishlist" element={<WishlistModuleConfig />} />
          <Route path="modules/orders" element={<OrdersModuleConfig />} />
          {/* User Modules */}
          <Route path="modules/users" element={<UsersModuleConfig />} />
          <Route path="modules/customers" element={<CustomersModuleConfig />} />
          <Route path="modules/roles" element={<RolesModuleConfig />} />
          {/* System Modules */}
          <Route path="modules/settings" element={<SettingsModuleConfig />} />
          <Route path="modules/menus" element={<MenusModuleConfig />} />
          <Route path="modules/homepage" element={<HomepageModuleConfig />} />

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