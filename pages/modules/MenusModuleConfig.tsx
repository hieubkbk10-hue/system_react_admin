import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Menu, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  FileText,
  Lock,
  Layers,
  Link,
  Image,
  ExternalLink
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'select' | 'boolean' | 'image';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  select: Link,
  boolean: ToggleLeft,
  image: Image,
};

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-sky-500' : 'bg-slate-300 dark:bg-slate-700'}`}
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
            ? 'bg-sky-500/10 text-sky-600 dark:text-sky-400' 
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

export const MenusModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [features, setFeatures] = useState({
    enableIcon: false,
    enableNestedMenu: true,
  });
  
  const [menuFields, setMenuFields] = useState<FieldConfig[]>([
    { id: 'M1', name: 'Tên menu', key: 'title', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'M2', name: 'URL / Link', key: 'url', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'M3', name: 'Vị trí', key: 'location', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'M4', name: 'Thứ tự', key: 'order', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'M5', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    { id: 'M6', name: 'Menu cha', key: 'parent_id', type: 'select', required: false, enabled: true, isSystem: false },
    { id: 'M7', name: 'Icon', key: 'icon', type: 'image', required: false, enabled: false, isSystem: false },
    { id: 'M8', name: 'Mở tab mới', key: 'target_blank', type: 'boolean', required: false, enabled: true, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    maxDepth: 2,
  });
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => {
      const newValue = !(prev as any)[key];
      if (key === 'enableIcon') {
        setMenuFields(fields => fields.map(f => f.key === 'icon' ? { ...f, enabled: newValue } : f));
      }
      if (key === 'enableNestedMenu') {
        setMenuFields(fields => fields.map(f => f.key === 'parent_id' ? { ...f, enabled: newValue } : f));
      }
      return { ...prev, [key]: newValue };
    });
  };
  
  const handleToggleField = (id: string) => {
    const field = menuFields.find(f => f.id === id);
    if (field?.key === 'icon') {
      handleToggleFeature('enableIcon');
    } else if (field?.key === 'parent_id') {
      handleToggleFeature('enableNestedMenu');
    } else {
      setMenuFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    }
  };
  
  const requiredFields = menuFields.filter(f => f.required);
  const optionalFields = menuFields.filter(f => !f.required);
  
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
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Menu size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Menu điều hướng</h1>
              <p className="text-sm text-slate-500">Quản lý menu header, footer</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-sky-600 hover:bg-sky-500 text-white text-sm font-medium rounded-lg transition-colors">
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
              <label className="text-xs text-slate-500 mb-1 block">Độ sâu tối đa (nested)</label>
              <input 
                type="number" 
                value={settings.maxDepth}
                min={1}
                max={3}
                onChange={(e) => setSettings({...settings, maxDepth: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-sky-500"
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
                  <Layers size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Menu lồng nhau</span>
                </div>
                <ToggleSwitch 
                  enabled={features.enableNestedMenu} 
                  onChange={() => handleToggleFeature('enableNestedMenu')}
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <Image size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Icon menu</span>
                </div>
                <ToggleSwitch 
                  enabled={features.enableIcon} 
                  onChange={() => handleToggleFeature('enableIcon')}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Column 2: Menu Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Menu size={14} className="text-sky-500" /> Trường menu
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
        
        {/* Column 3: Locations */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Vị trí menu</h3>
          <div className="space-y-2">
            {['header', 'footer', 'sidebar'].map((loc) => (
              <div key={loc} className="p-2 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <code className="text-xs text-sky-600 dark:text-sky-400">{loc}</code>
                <span className="text-[10px] text-slate-500 capitalize">{loc === 'header' ? 'Menu chính' : loc === 'footer' ? 'Chân trang' : 'Sidebar'}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-3">
            * Trường <code className="text-sky-500">location</code> xác định vị trí hiển thị menu
          </p>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Menu hỗ trợ nested qua <code className="bg-blue-500/20 px-1 rounded">parent_id</code>.
          Trường <code className="bg-blue-500/20 px-1 rounded">order</code> và <code className="bg-blue-500/20 px-1 rounded">active</code> bắt buộc theo Rails convention.
        </p>
      </div>
    </div>
  );
};

export default MenusModuleConfig;
