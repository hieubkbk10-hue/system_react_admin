import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  ShoppingCart, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  FileText,
  Package,
  AlertTriangle,
  Clock,
  Percent
} from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: string;
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  number: Hash,
  boolean: ToggleLeft,
  select: Package,
};

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
      enabled ? 'left-5' : 'left-0.5'
    }`} />
  </button>
);

const FieldRow = ({ field, onToggle }: { field: FieldConfig; onToggle: (id: string) => void }) => {
  const TypeIcon = fieldTypeIcons[field.type] || FileText;
  
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
      field.enabled 
        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-50'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded flex items-center justify-center ${
          field.enabled ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        }`}>
          <TypeIcon size={14} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{field.name}</span>
            {field.required && (
              <span className="text-[8px] px-1 py-0.5 rounded bg-rose-500/10 text-rose-500">BẮT BUỘC</span>
            )}
          </div>
          <code className="text-[10px] text-slate-400 font-mono">{field.key}</code>
        </div>
      </div>
      
      <ToggleSwitch 
        enabled={field.enabled} 
        onChange={() => onToggle(field.id)}
        disabled={field.isSystem && field.required}
      />
    </div>
  );
};

export const CartModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [cartFields, setCartFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'CT1', name: 'Sản phẩm', key: 'product_id', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'CT2', name: 'Số lượng', key: 'quantity', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'CT3', name: 'Giá tại thời điểm', key: 'price', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'CT4', name: 'Thứ tự', key: 'order', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'CT5', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'CT6', name: 'Biến thể', key: 'variant_id', type: 'select', required: false, enabled: true, isSystem: false },
    { id: 'CT7', name: 'Ghi chú', key: 'note', type: 'text', required: false, enabled: false, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    cartExpiry: 7, // days
    maxQuantityPerItem: 10,
    enableGuestCart: true,
  });
  
  const handleToggleField = (id: string) => {
    setCartFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const requiredFields = cartFields.filter(f => f.required);
  const optionalFields = cartFields.filter(f => !f.required);
  
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
            <div className="w-12 h-12 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400 flex items-center justify-center">
              <ShoppingCart size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Giỏ hàng</h1>
              <p className="text-sm text-slate-500">Cấu hình giỏ hàng cho khách</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium rounded-lg transition-colors">
          <Save size={16} /> Lưu thay đổi
        </button>
      </div>
      
      {/* Dependency Warning */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
        <div>
          <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">Module phụ thuộc</h4>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
            Module này phụ thuộc vào <Link to="/modules/products" className="underline font-medium">Module Sản phẩm</Link>. 
            Nếu tắt module Sản phẩm, module này sẽ tự động bị tắt.
          </p>
        </div>
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
      
      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Column 1: Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Settings size={14} className="text-slate-500" /> Cài đặt
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 flex items-center gap-1">
                <Clock size={10} /> Giỏ hàng hết hạn sau (ngày)
              </label>
              <input 
                type="number" 
                value={settings.cartExpiry}
                onChange={(e) => setSettings({...settings, cartExpiry: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
            
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Số lượng tối đa / SP</label>
              <input 
                type="number" 
                value={settings.maxQuantityPerItem}
                onChange={(e) => setSettings({...settings, maxQuantityPerItem: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500"
              />
            </div>
            
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
              <span className="text-xs text-slate-700 dark:text-slate-200">Cho phép giỏ hàng khách</span>
              <ToggleSwitch 
                enabled={settings.enableGuestCart} 
                onChange={() => setSettings({...settings, enableGuestCart: !settings.enableGuestCart})}
              />
            </div>
          </div>
        </div>
        
        {/* Column 2: Cart Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <ShoppingCart size={14} className="text-orange-500" /> Trường giỏ hàng
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleField} />
              ))}
            </div>
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
              {optionalFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleField} />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Giỏ hàng thuộc về <code className="bg-blue-500/20 px-1 rounded">user_id</code> hoặc <code className="bg-blue-500/20 px-1 rounded">session_id</code> (guest). 
          Giá lưu tại thời điểm thêm vào giỏ để tracking price history.
        </p>
      </div>
    </div>
  );
};

export default CartModuleConfig;
