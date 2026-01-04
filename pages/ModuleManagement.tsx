import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Settings, 
  Shield, 
  Users, 
  Package, 
  FileText, 
  ShoppingCart,
  ShoppingBag,
  Heart, 
  MessageSquare, 
  Image, 
  LayoutGrid, 
  Menu, 
  Bell, 
  Megaphone,
  BarChart3,
  Lock,
  Check,
  X,
  UserCog,
  Layers,
  ChevronDown,
  FileCode,
  Download,
  ExternalLink,
  Sparkles
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { AdminModule, PermissionAction } from '../types';

// Preset Configurations - Convention over Configuration
interface PresetConfig {
  id: string;
  name: string;
  description: string;
  icon: string;
  modules: string[]; // Module IDs to enable
}

const PRESET_CONFIGS: PresetConfig[] = [
  {
    id: 'blog',
    name: 'Blog / Tin tức',
    description: 'Website blog, tin tức với bài viết và bình luận',
    icon: '📝',
    modules: ['MOD-POSTS', 'MOD-COMMENTS', 'MOD-MEDIA', 'MOD-CUSTOMERS', 'MOD-USERS', 'MOD-ROLES', 'MOD-SETTINGS', 'MOD-MENUS', 'MOD-HOMEPAGE', 'MOD-ANALYTICS']
  },
  {
    id: 'landing',
    name: 'Landing Page',
    description: 'Trang giới thiệu, portfolio, liên hệ đơn giản',
    icon: '🚀',
    modules: ['MOD-POSTS', 'MOD-MEDIA', 'MOD-USERS', 'MOD-ROLES', 'MOD-SETTINGS', 'MOD-MENUS', 'MOD-HOMEPAGE']
  },
  {
    id: 'catalog',
    name: 'Catalog / Showcase',
    description: 'Trưng bày sản phẩm, không cần giỏ hàng (liên hệ đặt hàng)',
    icon: '📦',
    modules: ['MOD-PRODUCTS', 'MOD-MEDIA', 'MOD-CUSTOMERS', 'MOD-USERS', 'MOD-ROLES', 'MOD-SETTINGS', 'MOD-MENUS', 'MOD-HOMEPAGE', 'MOD-NOTIFICATIONS', 'MOD-ANALYTICS']
  },
  {
    id: 'ecommerce-basic',
    name: 'eCommerce Basic',
    description: 'Shop đơn giản với giỏ hàng, không khuyến mãi',
    icon: '🛒',
    modules: ['MOD-PRODUCTS', 'MOD-ORDERS', 'MOD-CART', 'MOD-MEDIA', 'MOD-CUSTOMERS', 'MOD-USERS', 'MOD-ROLES', 'MOD-SETTINGS', 'MOD-MENUS', 'MOD-HOMEPAGE', 'MOD-NOTIFICATIONS', 'MOD-ANALYTICS']
  },
  {
    id: 'ecommerce-full',
    name: 'eCommerce Full',
    description: 'Shop đầy đủ: giỏ hàng, wishlist, khuyến mãi, thống kê',
    icon: '🏪',
    modules: ['MOD-POSTS', 'MOD-COMMENTS', 'MOD-MEDIA', 'MOD-PRODUCTS', 'MOD-ORDERS', 'MOD-CART', 'MOD-WISHLIST', 'MOD-CUSTOMERS', 'MOD-USERS', 'MOD-ROLES', 'MOD-SETTINGS', 'MOD-MENUS', 'MOD-HOMEPAGE', 'MOD-NOTIFICATIONS', 'MOD-PROMOTIONS', 'MOD-ANALYTICS']
  },
  {
    id: 'custom',
    name: 'Tùy chỉnh',
    description: 'Cấu hình thủ công theo nhu cầu riêng',
    icon: '⚙️',
    modules: [] // Will not change modules
  }
];

// Mock Data - Modules
const mockModules: AdminModule[] = [
  // Content Modules
  { id: 'MOD-POSTS', key: 'posts', name: 'Bài viết & Danh mục', description: 'Quản lý bài viết, tin tức, blog và danh mục bài viết', icon: 'FileText', category: 'content', enabled: true, isCore: false, permissions: ['view', 'create', 'edit', 'delete'], order: 1, updatedAt: '2 giờ trước', updatedBy: 'admin' },
  { id: 'MOD-COMMENTS', key: 'comments', name: 'Bình luận', description: 'Bình luận cho bài viết và đánh giá sản phẩm', icon: 'MessageSquare', category: 'content', enabled: true, isCore: false, dependencies: ['MOD-POSTS', 'MOD-PRODUCTS'], dependencyType: 'any', permissions: ['view', 'edit', 'delete'], order: 2, updatedAt: '1 giờ trước', updatedBy: 'admin' },
  { id: 'MOD-MEDIA', key: 'media', name: 'Thư viện Media', description: 'Quản lý hình ảnh, video, tài liệu', icon: 'Image', category: 'content', enabled: true, isCore: false, permissions: ['view', 'create', 'delete'], order: 3, updatedAt: '1 ngày trước', updatedBy: 'admin' },
  
  // Commerce Modules
  { id: 'MOD-PRODUCTS', key: 'products', name: 'Sản phẩm & Danh mục', description: 'Quản lý sản phẩm, danh mục sản phẩm, kho hàng', icon: 'Package', category: 'commerce', enabled: true, isCore: false, permissions: ['view', 'create', 'edit', 'delete', 'import', 'export'], order: 4, updatedAt: '30 phút trước', updatedBy: 'editor' },
  { id: 'MOD-ORDERS', key: 'orders', name: 'Đơn hàng', description: 'Quản lý đơn hàng, vận chuyển', icon: 'ShoppingBag', category: 'commerce', enabled: true, isCore: false, dependencies: ['MOD-PRODUCTS', 'MOD-CUSTOMERS'], permissions: ['view', 'create', 'edit', 'delete', 'export'], order: 5, updatedAt: '15 phút trước', updatedBy: 'admin' },
  { id: 'MOD-CART', key: 'cart', name: 'Giỏ hàng', description: 'Chức năng giỏ hàng cho khách', icon: 'ShoppingCart', category: 'commerce', enabled: true, isCore: false, dependencies: ['MOD-PRODUCTS'], permissions: ['view'], order: 6, updatedAt: '2 ngày trước', updatedBy: 'admin' },
  { id: 'MOD-WISHLIST', key: 'wishlist', name: 'Sản phẩm yêu thích', description: 'Danh sách sản phẩm yêu thích của khách', icon: 'Heart', category: 'commerce', enabled: false, isCore: false, dependencies: ['MOD-PRODUCTS'], permissions: ['view'], order: 7, updatedAt: '1 tuần trước', updatedBy: 'admin' },
  
  // User Modules
  { id: 'MOD-CUSTOMERS', key: 'customers', name: 'Khách hàng', description: 'Quản lý thông tin khách hàng', icon: 'Users', category: 'user', enabled: true, isCore: true, permissions: ['view', 'create', 'edit', 'delete', 'export'], order: 9, updatedAt: '1 giờ trước', updatedBy: 'admin' },
  { id: 'MOD-USERS', key: 'users', name: 'Người dùng Admin', description: 'Quản lý tài khoản admin', icon: 'UserCog', category: 'user', enabled: true, isCore: true, permissions: ['view', 'create', 'edit', 'delete'], order: 10, updatedAt: '5 ngày trước', updatedBy: 'superadmin' },
  { id: 'MOD-ROLES', key: 'roles', name: 'Vai trò & Quyền', description: 'Phân quyền và quản lý vai trò', icon: 'Shield', category: 'user', enabled: true, isCore: true, permissions: ['view', 'create', 'edit', 'delete'], order: 11, updatedAt: '1 tuần trước', updatedBy: 'superadmin' },
  
  // System Modules
  { id: 'MOD-SETTINGS', key: 'settings', name: 'Cài đặt hệ thống', description: 'Cấu hình website và hệ thống', icon: 'Settings', category: 'system', enabled: true, isCore: true, permissions: ['view', 'edit'], order: 12, updatedAt: '3 ngày trước', updatedBy: 'admin' },
  { id: 'MOD-MENUS', key: 'menus', name: 'Menu điều hướng', description: 'Quản lý menu header, footer', icon: 'Menu', category: 'system', enabled: true, isCore: false, permissions: ['view', 'create', 'edit', 'delete'], order: 13, updatedAt: '2 tuần trước', updatedBy: 'admin' },
  { id: 'MOD-HOMEPAGE', key: 'homepage', name: 'Trang chủ', description: 'Cấu hình components trang chủ', icon: 'LayoutGrid', category: 'system', enabled: true, isCore: false, permissions: ['view', 'edit'], order: 14, updatedAt: '4 ngày trước', updatedBy: 'editor' },
  
  // Marketing Modules
  { id: 'MOD-NOTIFICATIONS', key: 'notifications', name: 'Thông báo', description: 'Gửi thông báo cho người dùng', icon: 'Bell', category: 'marketing', enabled: true, isCore: false, permissions: ['view', 'create', 'delete'], order: 15, updatedAt: '6 giờ trước', updatedBy: 'marketing' },
  { id: 'MOD-PROMOTIONS', key: 'promotions', name: 'Khuyến mãi', description: 'Quản lý mã giảm giá, voucher', icon: 'Megaphone', category: 'marketing', enabled: false, isCore: false, dependencies: ['MOD-PRODUCTS', 'MOD-ORDERS'], permissions: ['view', 'create', 'edit', 'delete'], order: 16, updatedAt: '1 tháng trước', updatedBy: 'admin' },
  { id: 'MOD-ANALYTICS', key: 'analytics', name: 'Thống kê', description: 'Báo cáo và phân tích dữ liệu', icon: 'BarChart3', category: 'marketing', enabled: true, isCore: false, permissions: ['view', 'export'], order: 17, updatedAt: '12 giờ trước', updatedBy: 'admin' },
];

const iconMap: Record<string, any> = {
  FileText, Image, MessageSquare, Package, ShoppingCart, ShoppingBag, Heart, 
  Users, UserCog, Shield, Settings, Menu, LayoutGrid, Bell, Megaphone, BarChart3
};

const categoryLabels: Record<string, { label: string; color: string }> = {
  content: { label: 'Nội dung', color: 'text-blue-400' },
  commerce: { label: 'Thương mại', color: 'text-emerald-400' },
  user: { label: 'Người dùng', color: 'text-purple-400' },
  system: { label: 'Hệ thống', color: 'text-orange-400' },
  marketing: { label: 'Marketing', color: 'text-pink-400' },
};

const permissionLabels: Record<PermissionAction, string> = {
  view: 'Xem',
  create: 'Tạo',
  edit: 'Sửa',
  delete: 'Xóa',
  export: 'Xuất',
  import: 'Nhập'
};

// Module config routes mapping
const moduleConfigRoutes: Record<string, string> = {
  // Content
  'MOD-POSTS': '/modules/posts',
  'MOD-COMMENTS': '/modules/comments',
  'MOD-MEDIA': '/modules/media',
  // Commerce
  'MOD-PRODUCTS': '/modules/products',
  'MOD-CART': '/modules/cart',
  'MOD-WISHLIST': '/modules/wishlist',
  'MOD-ORDERS': '/modules/orders',
  // User
  'MOD-CUSTOMERS': '/modules/customers',
  'MOD-USERS': '/modules/users',
  'MOD-ROLES': '/modules/roles',
  // System
  'MOD-SETTINGS': '/modules/settings',
  'MOD-MENUS': '/modules/menus',
  'MOD-HOMEPAGE': '/modules/homepage',
  // Marketing
  'MOD-NOTIFICATIONS': '/modules/notifications',
  'MOD-PROMOTIONS': '/modules/promotions',
  'MOD-ANALYTICS': '/modules/analytics',
};

// Helper: Generate Markdown config
const generateConfigMarkdown = (modules: AdminModule[], presetId?: string): string => {
  const enabledModules = modules.filter(m => m.enabled);
  const disabledModules = modules.filter(m => !m.enabled);
  const preset = PRESET_CONFIGS.find(p => p.id === presetId);
  
  const now = new Date().toLocaleDateString('vi-VN', { 
    year: 'numeric', month: '2-digit', day: '2-digit', 
    hour: '2-digit', minute: '2-digit' 
  });

  return `# Admin Module Configuration

> Generated: ${now}
> Preset: ${preset?.name || 'Tùy chỉnh'}

## Tổng quan

- **Modules bật:** ${enabledModules.length}
- **Modules tắt:** ${disabledModules.length}

## Modules được bật

| Module | Category | Core | Permissions |
|--------|----------|------|-------------|
${enabledModules.map(m => 
  `| ${m.name} | ${categoryLabels[m.category].label} | ${m.isCore ? '✅' : '❌'} | ${m.permissions.join(', ')} |`
).join('\n')}

## Modules bị tắt

${disabledModules.length > 0 
  ? disabledModules.map(m => `- ~~${m.name}~~ (${categoryLabels[m.category].label})`).join('\n')
  : '_Không có module nào bị tắt_'}

## JSON Config

\`\`\`json
{
  "preset": "${presetId || 'custom'}",
  "modules": {
${modules.map(m => `    "${m.key}": ${m.enabled}`).join(',\n')}
  }
}
\`\`\`

---
*Config này có thể import vào dự án mới hoặc share cho team.*
`;
};

// Component: Preset Dropdown
const PresetDropdown: React.FC<{
  selectedPreset: string;
  onSelect: (presetId: string) => void;
}> = ({ selectedPreset, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const selected = PRESET_CONFIGS.find(p => p.id === selectedPreset) || PRESET_CONFIGS[5];

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white text-sm font-medium rounded-lg transition-all shadow-sm"
      >
        <Sparkles size={16} />
        <span>{selected.icon} {selected.name}</span>
        <ChevronDown size={14} className={`transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      
      {isOpen && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-1 w-72 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg shadow-xl z-20 overflow-hidden">
            <div className="p-2 border-b border-slate-100 dark:border-slate-800">
              <p className="text-[10px] text-slate-500 uppercase font-semibold px-2">Chọn cấu hình mẫu</p>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {PRESET_CONFIGS.map(preset => (
                <button
                  key={preset.id}
                  onClick={() => { onSelect(preset.id); setIsOpen(false); }}
                  className={`w-full px-3 py-2.5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors ${
                    selectedPreset === preset.id ? 'bg-cyan-50 dark:bg-cyan-900/20' : ''
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">{preset.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-slate-800 dark:text-slate-200">{preset.name}</span>
                        {selectedPreset === preset.id && (
                          <Check size={14} className="text-cyan-500" />
                        )}
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">{preset.description}</p>
                      {preset.id !== 'custom' && (
                        <p className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-1">
                          {preset.modules.length} modules
                        </p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

// Component: Config Actions (View MD, Download, Open)
const ConfigActions: React.FC<{
  modules: AdminModule[];
  presetId: string;
}> = ({ modules, presetId }) => {
  const [showMarkdown, setShowMarkdown] = useState(false);
  const markdown = useMemo(() => generateConfigMarkdown(modules, presetId), [modules, presetId]);

  const handleDownload = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `admin-config-${presetId || 'custom'}-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleOpenNewTab = () => {
    const blob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <>
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowMarkdown(true)}
          className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          title="Xem cấu hình dạng Markdown"
        >
          <FileCode size={16} />
          <span className="hidden sm:inline">Xem Config</span>
        </button>
        <button
          onClick={handleDownload}
          className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          title="Tải về file .md"
        >
          <Download size={16} />
        </button>
        <button
          onClick={handleOpenNewTab}
          className="flex items-center gap-1.5 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-sm font-medium rounded-lg hover:border-slate-300 dark:hover:border-slate-600 transition-colors"
          title="Mở trong tab mới"
        >
          <ExternalLink size={16} />
        </button>
      </div>

      {/* Markdown Modal */}
      {showMarkdown && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-xl shadow-2xl w-full max-w-3xl max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-700">
              <h3 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <FileCode size={20} /> Module Configuration
              </h3>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors"
                >
                  <Download size={14} /> Tải về
                </button>
                <button
                  onClick={() => setShowMarkdown(false)}
                  className="p-1.5 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
                >
                  <X size={20} className="text-slate-500" />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-auto p-4">
              <pre className="text-sm text-slate-700 dark:text-slate-300 whitespace-pre-wrap font-mono bg-slate-50 dark:bg-slate-950 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
                {markdown}
              </pre>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Component: Module Card
const ModuleCard: React.FC<{ 
  module: AdminModule; 
  onToggle: (id: string) => void;
  canToggle: boolean;
  allModules: AdminModule[];
}> = ({ module, onToggle, canToggle, allModules }) => {
  const Icon = iconMap[module.icon] || Package;
  const category = categoryLabels[module.category];
  const configRoute = moduleConfigRoutes[module.id];
  const isDisabled = module.isCore || !canToggle;
  
  // Check if this module has dependents that are enabled
  const hasDependents = allModules.some(m => m.dependencies?.includes(module.id) && m.enabled);
  
  return (
    <div className={`bg-white dark:bg-slate-900 border rounded-lg p-4 transition-all ${
      module.enabled 
        ? 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700' 
        : 'border-slate-200 dark:border-slate-800 opacity-60'
    }`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
            module.enabled 
              ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
          }`}>
            <Icon size={20} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <h3 className="text-slate-800 dark:text-slate-200 font-medium text-sm truncate">{module.name}</h3>
              {module.isCore && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 font-medium">
                  CORE
                </span>
              )}
              {hasDependents && module.enabled && (
                <span className="text-[9px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20 font-medium">
                  PARENT
                </span>
              )}
            </div>
            <p className="text-xs text-slate-500 line-clamp-2">{module.description}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-[10px] font-medium ${category.color}`}>{category.label}</span>
              <span className="w-1 h-1 rounded-full bg-slate-400 dark:bg-slate-600"></span>
              <span className="text-[10px] text-slate-500">{module.permissions.length} quyền</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end gap-2">
          <button 
            onClick={() => !isDisabled && onToggle(module.id)}
            disabled={isDisabled}
            title={!canToggle && !module.isCore ? 'Bật module phụ thuộc trước' : undefined}
            className={`relative w-11 h-6 rounded-full transition-colors ${
              isDisabled 
                ? 'bg-slate-200 dark:bg-slate-700 cursor-not-allowed' 
                : module.enabled 
                  ? 'bg-cyan-500 cursor-pointer' 
                  : 'bg-slate-300 dark:bg-slate-700 cursor-pointer'
            }`}
          >
            <div className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${
              module.enabled ? 'left-6' : 'left-1'
            }`}></div>
          </button>
          {module.isCore && (
            <Lock size={12} className="text-slate-400" />
          )}
          {!canToggle && !module.isCore && (
            <span className="text-[9px] text-rose-500">Cần bật parent</span>
          )}
        </div>
      </div>
      
      <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
        {module.dependencies && module.dependencies.length > 0 ? (
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Layers size={10} />
            <span>Phụ thuộc: {module.dependencies.map(d => mockModules.find(m => m.id === d)?.name).join(', ')}</span>
          </div>
        ) : (
          <div></div>
        )}
        
        {configRoute && module.enabled && (
          <Link 
            to={configRoute}
            className="flex items-center gap-1 text-[11px] text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 font-medium"
          >
            <Settings size={12} /> Cấu hình
          </Link>
        )}
      </div>
    </div>
  );
};

// Main Component
export const ModuleManagement: React.FC = () => {
  const [modules, setModules] = useState(mockModules);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<string>('custom');

  // Handle preset selection
  const handlePresetSelect = (presetId: string) => {
    setSelectedPreset(presetId);
    const preset = PRESET_CONFIGS.find(p => p.id === presetId);
    if (!preset || presetId === 'custom') return;
    
    setModules(prev => prev.map(m => ({
      ...m,
      enabled: m.isCore || preset.modules.includes(m.id)
    })));
  };
  
  const handleToggleModule = (id: string) => {
    setSelectedPreset('custom'); // Manual toggle = custom config
    setModules(prev => {
      const targetModule = prev.find(m => m.id === id);
      if (!targetModule) return prev;
      
      const newEnabled = !targetModule.enabled;
      
      return prev.map(m => {
        // Toggle the target module
        if (m.id === id) {
          return { ...m, enabled: newEnabled };
        }
        
        // If turning OFF a parent module, check dependent modules
        if (!newEnabled && m.dependencies?.includes(id)) {
          // Check dependency type
          if (m.dependencyType === 'any') {
            // OR logic: only disable if ALL parents are now off
            const otherParentsEnabled = m.dependencies
              .filter(depId => depId !== id)
              .some(depId => prev.find(pm => pm.id === depId)?.enabled);
            
            if (!otherParentsEnabled) {
              return { ...m, enabled: false };
            }
          } else {
            // AND logic (default): disable immediately when any parent is off
            return { ...m, enabled: false };
          }
        }
        
        return m;
      });
    });
  };
  
  // Check if module can be toggled (dependencies must be enabled)
  const canToggleModule = (module: AdminModule): boolean => {
    if (module.isCore) return false;
    if (!module.dependencies || module.dependencies.length === 0) return true;
    
    if (module.dependencyType === 'any') {
      // OR logic: at least one dependency must be enabled
      return module.dependencies.some(depId => 
        modules.find(m => m.id === depId)?.enabled
      );
    } else {
      // AND logic (default): all dependencies must be enabled
      return module.dependencies.every(depId => 
        modules.find(m => m.id === depId)?.enabled
      );
    }
  };
  
  const filteredModules = modules.filter(m => {
    const matchCategory = filterCategory === 'all' || m.category === filterCategory;
    const matchSearch = m.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                       m.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });
  
  const groupedModules = filteredModules.reduce((acc, module) => {
    if (!acc[module.category]) acc[module.category] = [];
    acc[module.category].push(module);
    return acc;
  }, {} as Record<string, AdminModule[]>);
  
  const enabledCount = modules.filter(m => m.enabled).length;
  const disabledCount = modules.filter(m => !m.enabled).length;
  
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Quản lý Module</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              Bật/tắt các chức năng cho Admin Dashboard
            </p>
          </div>
          
          <div className="flex items-center gap-2 text-xs">
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
              <Check size={12} /> {enabledCount} bật
            </span>
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
              <X size={12} /> {disabledCount} tắt
            </span>
          </div>
        </div>
        
        {/* Preset & Config Actions */}
        <div className="flex flex-wrap items-center gap-3">
          <PresetDropdown selectedPreset={selectedPreset} onSelect={handlePresetSelect} />
          <ConfigActions modules={modules} presetId={selectedPreset} />
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
          <input 
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Tìm kiếm module..." 
            className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg py-2 pl-9 pr-4 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-cyan-500/50 outline-none"
          />
        </div>
        
        <div className="flex gap-2 flex-wrap">
          {['all', ...Object.keys(categoryLabels)].map((cat) => (
            <button 
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg border transition-all ${
                filterCategory === cat 
                  ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-600 dark:text-cyan-400' 
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300'
              }`}
            >
              {cat === 'all' ? 'Tất cả' : categoryLabels[cat].label}
            </button>
          ))}
        </div>
      </div>
      
      {/* Module Groups */}
      <div className="space-y-6">
        {Object.entries(groupedModules).map(([category, mods]) => (
          <div key={category}>
            <h3 className={`text-sm font-semibold mb-3 flex items-center gap-2 ${categoryLabels[category].color}`}>
              {categoryLabels[category].label}
              <span className="text-xs font-normal text-slate-500">({(mods as AdminModule[]).length})</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {(mods as AdminModule[]).map(module => (
                <ModuleCard 
                  key={module.id} 
                  module={module} 
                  onToggle={handleToggleModule}
                  canToggle={canToggleModule(module)}
                  allModules={modules}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {filteredModules.length === 0 && (
        <div className="text-center py-12 text-slate-500">
          <Package size={48} className="mx-auto mb-3 opacity-50" />
          <p>Không tìm thấy module nào</p>
        </div>
      )}
    </div>
  );
};

export default ModuleManagement;
