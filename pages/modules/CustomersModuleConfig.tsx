import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Users, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  Mail,
  Phone,
  Image,
  FileText,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'email' | 'phone' | 'image' | 'boolean';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  email: Mail,
  phone: Phone,
  image: Image,
  boolean: ToggleLeft,
};

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-indigo-500' : 'bg-slate-300 dark:bg-slate-700'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
      enabled ? 'left-5' : 'left-0.5'
    }`} />
  </button>
);

const FieldRow: React.FC<{ field: FieldConfig; onToggle: (id: string) => void }> = ({ field, onToggle }) => {
  const TypeIcon = fieldTypeIcons[field.type] || FileText;
  
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
      field.enabled 
        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-50'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded flex items-center justify-center ${
          field.enabled 
            ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' 
            : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
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

export const CustomersModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [customerFields, setCustomerFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'C1', name: 'Họ và tên', key: 'full_name', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'C2', name: 'Email', key: 'email', type: 'email', required: true, enabled: true, isSystem: true },
    { id: 'C3', name: 'Số điện thoại', key: 'phone', type: 'phone', required: true, enabled: true, isSystem: true },
    { id: 'C4', name: 'Thứ tự', key: 'order', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'C5', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'C6', name: 'Ảnh đại diện', key: 'avatar', type: 'image', required: false, enabled: false, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    customersPerPage: 20,
  });
  
  const handleToggleCustomerField = (id: string) => {
    setCustomerFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const requiredFields = customerFields.filter(f => f.required);
  const optionalFields = customerFields.filter(f => !f.required);
  
  return (
    <div className="space-y-6 max-w-3xl mx-auto">
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
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Khách hàng</h1>
              <p className="text-sm text-slate-500">Quản lý thông tin khách hàng</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors">
          <Save size={16} /> Lưu thay đổi
        </button>
      </div>
      
      {/* Module Status */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Check size={16} />
          </div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Module Core - Luôn hoạt động</span>
        </div>
        <Lock size={16} className="text-slate-400" />
      </div>
      
      {/* Main Content - 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Column 1: Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Settings size={14} className="text-slate-500" /> Cài đặt
          </h3>
          
          <div>
            <label className="text-xs text-slate-500 mb-1 block">Số KH / trang</label>
            <input 
              type="number" 
              value={settings.customersPerPage}
              onChange={(e) => setSettings({...settings, customersPerPage: parseInt(e.target.value)})}
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
            />
          </div>
        </div>
        
        {/* Column 2: Customer Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Users size={14} className="text-indigo-500" /> Trường khách hàng
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleCustomerField} />
              ))}
            </div>
            
            {optionalFields.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
                {optionalFields.map(field => (
                  <FieldRow key={field.id} field={field} onToggle={handleToggleCustomerField} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Email unique và lowercase. Trường <code className="bg-blue-500/20 px-1 rounded">order</code> và <code className="bg-blue-500/20 px-1 rounded">active</code> bắt buộc theo Rails convention.
        </p>
      </div>
    </div>
  );
};

export default CustomersModuleConfig;
