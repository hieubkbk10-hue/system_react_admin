import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  BarChart3, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Layers,
  TrendingUp,
  Users,
  ShoppingBag,
  Eye,
  FileText
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-700'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
      enabled ? 'left-5' : 'left-0.5'
    }`} />
  </button>
);

export const AnalyticsModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [features, setFeatures] = useState({
    enableSalesReport: true,
    enableCustomerReport: true,
    enableProductReport: true,
    enableTrafficReport: false,
  });
  
  const [settings, setSettings] = useState({
    defaultPeriod: '30',
    cacheMinutes: 5,
  });
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => ({ ...prev, [key]: !(prev as any)[key] }));
  };
  
  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/modules')}
            className="p-2 text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <BarChart3 size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Thống kê</h1>
              <p className="text-sm text-slate-500">Báo cáo và phân tích dữ liệu</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium rounded-lg transition-colors">
          <Save size={16} /> Lưu thay đổi
        </button>
      </div>
      
      {/* Module Status */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Check size={16} />
          </div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Module đang hoạt động</span>
        </div>
        <ToggleSwitch enabled={true} onChange={() => {}} />
      </div>
      
      {/* Main Content - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Column 1: Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Settings size={14} className="text-slate-500" /> Cài đặt
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Khoảng thời gian mặc định</label>
              <select 
                value={settings.defaultPeriod}
                onChange={(e) => setSettings({...settings, defaultPeriod: e.target.value})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500"
              >
                <option value="7">7 ngày</option>
                <option value="30">30 ngày</option>
                <option value="90">90 ngày</option>
              </select>
            </div>
            
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Cache (phút)</label>
              <input 
                type="number" 
                value={settings.cacheMinutes}
                min={1}
                max={60}
                onChange={(e) => setSettings({...settings, cacheMinutes: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-teal-500"
              />
            </div>
          </div>
        </div>
        
        {/* Column 2: Reports */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Layers size={14} className="text-slate-500" /> Báo cáo
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <TrendingUp size={14} className="text-emerald-500" />
                <span className="text-sm text-slate-700 dark:text-slate-200">Doanh số</span>
              </div>
              <ToggleSwitch 
                enabled={features.enableSalesReport} 
                onChange={() => handleToggleFeature('enableSalesReport')}
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <Users size={14} className="text-indigo-500" />
                <span className="text-sm text-slate-700 dark:text-slate-200">Khách hàng</span>
              </div>
              <ToggleSwitch 
                enabled={features.enableCustomerReport} 
                onChange={() => handleToggleFeature('enableCustomerReport')}
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <ShoppingBag size={14} className="text-amber-500" />
                <span className="text-sm text-slate-700 dark:text-slate-200">Sản phẩm</span>
              </div>
              <ToggleSwitch 
                enabled={features.enableProductReport} 
                onChange={() => handleToggleFeature('enableProductReport')}
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-cyan-500" />
                <span className="text-sm text-slate-700 dark:text-slate-200">Lượt truy cập</span>
              </div>
              <ToggleSwitch 
                enabled={features.enableTrafficReport} 
                onChange={() => handleToggleFeature('enableTrafficReport')}
              />
            </div>
          </div>
        </div>
        
        {/* Column 3: Metrics */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Metrics theo báo cáo</h3>
          <div className="space-y-3">
            {features.enableSalesReport && (
              <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp size={12} className="text-emerald-600" />
                  <span className="text-xs font-medium text-emerald-700 dark:text-emerald-400">Doanh số</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['revenue', 'orders', 'avg_order'].map(m => (
                    <code key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-500/20 text-emerald-600">{m}</code>
                  ))}
                </div>
              </div>
            )}
            
            {features.enableCustomerReport && (
              <div className="p-3 rounded-lg bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <Users size={12} className="text-indigo-600" />
                  <span className="text-xs font-medium text-indigo-700 dark:text-indigo-400">Khách hàng</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['new_customers', 'returning'].map(m => (
                    <code key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-500/20 text-indigo-600">{m}</code>
                  ))}
                </div>
              </div>
            )}
            
            {features.enableProductReport && (
              <div className="p-3 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
                <div className="flex items-center gap-2 mb-2">
                  <ShoppingBag size={12} className="text-amber-600" />
                  <span className="text-xs font-medium text-amber-700 dark:text-amber-400">Sản phẩm</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {['top_selling', 'low_stock'].map(m => (
                    <code key={m} className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-600">{m}</code>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Dữ liệu được cache để tối ưu hiệu năng. 
          Báo cáo hỗ trợ export CSV/Excel qua quyền <code className="bg-blue-500/20 px-1 rounded">export</code>.
        </p>
      </div>
    </div>
  );
};

export default AnalyticsModuleConfig;
