import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  UserCog, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  Mail,
  Phone,
  Shield,
  Key,
  Image,
  FileText,
  Lock
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'email' | 'phone' | 'image' | 'select' | 'boolean' | 'password';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  email: Mail,
  phone: Phone,
  image: Image,
  select: Shield,
  boolean: ToggleLeft,
  password: Key,
};

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-purple-500' : 'bg-slate-300 dark:bg-slate-700'}`}
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
            ? 'bg-purple-500/10 text-purple-600 dark:text-purple-400' 
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

export const UsersModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [userFields, setUserFields] = useState<FieldConfig[]>([
    // Required (system) - RBAC essentials
    { id: 'U1', name: 'Email', key: 'email', type: 'email', required: true, enabled: true, isSystem: true },
    { id: 'U2', name: 'Mật khẩu', key: 'password', type: 'password', required: true, enabled: true, isSystem: true },
    { id: 'U3', name: 'Vai trò', key: 'role_id', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'U4', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'U5', name: 'Họ và tên', key: 'full_name', type: 'text', required: false, enabled: true, isSystem: false },
    { id: 'U6', name: 'Ảnh đại diện', key: 'avatar', type: 'image', required: false, enabled: false, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    sessionTimeout: 30,
    maxLoginAttempts: 5,
  });
  
  const handleToggleUserField = (id: string) => {
    setUserFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const requiredFields = userFields.filter(f => f.required);
  const optionalFields = userFields.filter(f => !f.required);
  
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
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 flex items-center justify-center">
              <UserCog size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Người dùng Admin</h1>
              <p className="text-sm text-slate-500">Quản lý tài khoản admin</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors">
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
            <Settings size={14} className="text-slate-500" /> Cài đặt bảo mật
          </h3>
          
          <div className="space-y-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Session timeout (phút)</label>
              <input 
                type="number" 
                value={settings.sessionTimeout}
                onChange={(e) => setSettings({...settings, sessionTimeout: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
              />
            </div>
            
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Max đăng nhập sai</label>
              <input 
                type="number" 
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings({...settings, maxLoginAttempts: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-purple-500"
              />
            </div>
          </div>
        </div>
        
        {/* Column 2: User Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <UserCog size={14} className="text-purple-500" /> Trường người dùng
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleUserField} />
              ))}
            </div>
            
            {optionalFields.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
                {optionalFields.map(field => (
                  <FieldRow key={field.id} field={field} onToggle={handleToggleUserField} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Module Link */}
      <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <Shield size={14} className="text-purple-500" />
            <span className="text-sm text-slate-700 dark:text-slate-200">Vai trò & Quyền</span>
          </div>
          <a href="#/modules/roles" className="text-[11px] text-purple-600 dark:text-purple-400 hover:underline">Cấu hình →</a>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Mật khẩu hash bằng bcrypt. Email unique và lowercase. 
          Trường <code className="bg-blue-500/20 px-1 rounded">role_id</code> liên kết module Roles.
        </p>
      </div>
    </div>
  );
};

export default UsersModuleConfig;
