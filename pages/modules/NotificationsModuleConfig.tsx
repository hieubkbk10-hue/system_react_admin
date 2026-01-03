import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Bell, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  FileText,
  Layers,
  Mail,
  MessageSquare,
  Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'textarea' | 'select' | 'boolean' | 'date';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  textarea: FileText,
  select: Users,
  boolean: ToggleLeft,
  date: Hash,
};

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'}`}
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
            ? 'bg-amber-500/10 text-amber-600 dark:text-amber-400' 
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

export const NotificationsModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [features, setFeatures] = useState({
    enableEmail: true,
    enableSchedule: false,
  });
  
  const [notificationFields, setNotificationFields] = useState<FieldConfig[]>([
    { id: 'N1', name: 'Tiêu đề', key: 'title', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'N2', name: 'Nội dung', key: 'content', type: 'textarea', required: true, enabled: true, isSystem: true },
    { id: 'N3', name: 'Loại', key: 'type', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'N4', name: 'Đối tượng', key: 'target', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'N5', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    { id: 'N6', name: 'Gửi email', key: 'send_email', type: 'boolean', required: false, enabled: true, isSystem: false },
    { id: 'N7', name: 'Hẹn giờ gửi', key: 'scheduled_at', type: 'date', required: false, enabled: false, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    notificationsPerPage: 20,
  });
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => {
      const newValue = !(prev as any)[key];
      if (key === 'enableEmail') {
        setNotificationFields(fields => fields.map(f => f.key === 'send_email' ? { ...f, enabled: newValue } : f));
      }
      if (key === 'enableSchedule') {
        setNotificationFields(fields => fields.map(f => f.key === 'scheduled_at' ? { ...f, enabled: newValue } : f));
      }
      return { ...prev, [key]: newValue };
    });
  };
  
  const handleToggleField = (id: string) => {
    const field = notificationFields.find(f => f.id === id);
    if (field?.key === 'send_email') {
      handleToggleFeature('enableEmail');
    } else if (field?.key === 'scheduled_at') {
      handleToggleFeature('enableSchedule');
    } else {
      setNotificationFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    }
  };
  
  const requiredFields = notificationFields.filter(f => f.required);
  const optionalFields = notificationFields.filter(f => !f.required);
  
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
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Bell size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Thông báo</h1>
              <p className="text-sm text-slate-500">Gửi thông báo cho người dùng</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-amber-600 hover:bg-amber-500 text-white text-sm font-medium rounded-lg transition-colors">
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
        
        {/* Column 1: Settings & Features */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Settings size={14} className="text-slate-500" /> Cài đặt
            </h3>
            
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Số thông báo / trang</label>
              <input 
                type="number" 
                value={settings.notificationsPerPage}
                onChange={(e) => setSettings({...settings, notificationsPerPage: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-amber-500"
              />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Layers size={14} className="text-slate-500" /> Tính năng
            </h3>
            
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Gửi email</span>
                </div>
                <ToggleSwitch 
                  enabled={features.enableEmail} 
                  onChange={() => handleToggleFeature('enableEmail')}
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Hẹn giờ gửi</span>
                </div>
                <ToggleSwitch 
                  enabled={features.enableSchedule} 
                  onChange={() => handleToggleFeature('enableSchedule')}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Column 2: Notification Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Bell size={14} className="text-amber-500" /> Trường thông báo
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleField} />
              ))}
            </div>
            
            {optionalFields.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
                {optionalFields.map(field => (
                  <FieldRow key={field.id} field={field} onToggle={handleToggleField} />
                ))}
              </div>
            )}
          </div>
        </div>
        
        {/* Column 3: Types & Targets */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Loại thông báo</h3>
            <div className="space-y-2">
              {['info', 'success', 'warning', 'error'].map((type) => (
                <div key={type} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                  <code className="text-xs text-amber-600 dark:text-amber-400">{type}</code>
                </div>
              ))}
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Đối tượng</h3>
            <div className="space-y-2">
              {[
                { key: 'all', label: 'Tất cả' },
                { key: 'customers', label: 'Khách hàng' },
                { key: 'admins', label: 'Admin' },
              ].map((target) => (
                <div key={target.key} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <code className="text-xs text-amber-600 dark:text-amber-400">{target.key}</code>
                  <span className="text-[10px] text-slate-500">{target.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Trường <code className="bg-blue-500/20 px-1 rounded">type</code> xác định màu hiển thị.
          <code className="bg-blue-500/20 px-1 rounded">target</code> xác định đối tượng nhận.
        </p>
      </div>
    </div>
  );
};

export default NotificationsModuleConfig;
