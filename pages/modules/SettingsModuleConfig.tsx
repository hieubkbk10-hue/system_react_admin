import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  FileText,
  Lock,
  Layers,
  Globe,
  Mail,
  Phone,
  MapPin,
  Image
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'textarea' | 'email' | 'phone' | 'image' | 'boolean';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
  group: 'site' | 'contact' | 'seo';
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  textarea: FileText,
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
    } ${enabled ? 'bg-orange-500' : 'bg-slate-300 dark:bg-slate-700'}`}
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
            ? 'bg-orange-500/10 text-orange-600 dark:text-orange-400' 
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

export const SettingsModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [features, setFeatures] = useState({
    enableSEO: true,
    enableContact: true,
  });
  
  const [settingFields, setSettingFields] = useState<FieldConfig[]>([
    // Site Info - Required
    { id: 'S1', name: 'Tên website', key: 'site_name', type: 'text', required: true, enabled: true, isSystem: true, group: 'site' },
    { id: 'S2', name: 'Logo', key: 'logo', type: 'image', required: true, enabled: true, isSystem: true, group: 'site' },
    { id: 'S3', name: 'Favicon', key: 'favicon', type: 'image', required: true, enabled: true, isSystem: true, group: 'site' },
    // Site Info - Optional
    { id: 'S4', name: 'Mô tả ngắn', key: 'tagline', type: 'text', required: false, enabled: true, isSystem: false, group: 'site' },
    // Contact
    { id: 'S5', name: 'Email', key: 'email', type: 'email', required: false, enabled: true, isSystem: false, group: 'contact' },
    { id: 'S6', name: 'Số điện thoại', key: 'phone', type: 'phone', required: false, enabled: true, isSystem: false, group: 'contact' },
    { id: 'S7', name: 'Địa chỉ', key: 'address', type: 'textarea', required: false, enabled: true, isSystem: false, group: 'contact' },
    // SEO
    { id: 'S8', name: 'Meta Title', key: 'meta_title', type: 'text', required: false, enabled: true, isSystem: false, group: 'seo' },
    { id: 'S9', name: 'Meta Description', key: 'meta_description', type: 'textarea', required: false, enabled: true, isSystem: false, group: 'seo' },
  ]);
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => {
      const newValue = !(prev as any)[key];
      const group = key === 'enableSEO' ? 'seo' : 'contact';
      setSettingFields(fields => fields.map(f => f.group === group ? { ...f, enabled: newValue } : f));
      return { ...prev, [key]: newValue };
    });
  };
  
  const handleToggleField = (id: string) => {
    setSettingFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const siteFields = settingFields.filter(f => f.group === 'site');
  const contactFields = settingFields.filter(f => f.group === 'contact');
  const seoFields = settingFields.filter(f => f.group === 'seo');
  
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
              <Settings size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Cài đặt hệ thống</h1>
              <p className="text-sm text-slate-500">Cấu hình thông tin website</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium rounded-lg transition-colors">
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
      
      {/* Main Content - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        
        {/* Column 1: Features */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Layers size={14} className="text-slate-500" /> Tính năng
          </h3>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <Mail size={14} className="text-slate-400" />
                <span className="text-sm text-slate-700 dark:text-slate-200">Thông tin liên hệ</span>
              </div>
              <ToggleSwitch 
                enabled={features.enableContact} 
                onChange={() => handleToggleFeature('enableContact')}
              />
            </div>
            <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
              <div className="flex items-center gap-2">
                <Globe size={14} className="text-slate-400" />
                <span className="text-sm text-slate-700 dark:text-slate-200">SEO cơ bản</span>
              </div>
              <ToggleSwitch 
                enabled={features.enableSEO} 
                onChange={() => handleToggleFeature('enableSEO')}
              />
            </div>
          </div>
        </div>
        
        {/* Column 2: Site Info */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Globe size={14} className="text-orange-500" /> Thông tin website
          </h3>
          
          <div className="space-y-1.5">
            {siteFields.map(field => (
              <FieldRow key={field.id} field={field} onToggle={handleToggleField} />
            ))}
          </div>
        </div>
        
        {/* Column 3: Contact & SEO */}
        <div className="space-y-4">
          {features.enableContact && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <MapPin size={14} className="text-cyan-500" /> Liên hệ
              </h3>
              <div className="space-y-1.5">
                {contactFields.map(field => (
                  <FieldRow key={field.id} field={field} onToggle={handleToggleField} />
                ))}
              </div>
            </div>
          )}
          
          {features.enableSEO && (
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
                <Globe size={14} className="text-emerald-500" /> SEO
              </h3>
              <div className="space-y-1.5">
                {seoFields.map(field => (
                  <FieldRow key={field.id} field={field} onToggle={handleToggleField} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Settings lưu dạng key-value trong database. 
          Logo và Favicon khuyến nghị dùng SVG hoặc PNG với kích thước chuẩn.
        </p>
      </div>
    </div>
  );
};

export default SettingsModuleConfig;
