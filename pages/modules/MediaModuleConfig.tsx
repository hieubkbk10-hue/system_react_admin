import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Image,
  Clock,
  Tag,
  ToggleLeft,
  Check,
  Info,
  Hash,
  FileText,
  Video,
  Music,
  File,
  HardDrive,
  Shield
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types
interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'textarea' | 'image' | 'select' | 'tags' | 'date' | 'boolean' | 'number';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
}

// Field Type Icons
const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  textarea: FileText,
  image: Image,
  select: Hash,
  tags: Tag,
  date: Clock,
  boolean: ToggleLeft,
  number: Hash,
};

// Components
const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-violet-500' : 'bg-slate-300 dark:bg-slate-700'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
      enabled ? 'left-5' : 'left-0.5'
    }`} />
  </button>
);

const FieldRow = ({ field, onToggle }: { field: FieldConfig; onToggle: (id: string) => void }) => {
  const TypeIcon = fieldTypeIcons[field.type] || FileText;
  
  return (
    <div className={`flex items-center justify-between p-2 rounded-lg border transition-all ${
      field.enabled 
        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-50'
    }`}>
      <div className="flex items-center gap-2">
        <div className={`w-6 h-6 rounded flex items-center justify-center ${
          field.enabled ? 'bg-violet-500/10 text-violet-600 dark:text-violet-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
        }`}>
          <TypeIcon size={12} />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-medium text-slate-700 dark:text-slate-200">{field.name}</span>
            {field.required && (
              <span className="text-[8px] px-1 py-0.5 rounded bg-rose-500/10 text-rose-500">BẮT BUỘC</span>
            )}
          </div>
          <code className="text-[9px] text-slate-400 font-mono">{field.key}</code>
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



// Main Component
export const MediaModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  

  
  // Media Fields
  const [mediaFields, setMediaFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'M1', name: 'Tên file', key: 'name', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'M2', name: 'Đường dẫn', key: 'file_path', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'M3', name: 'Loại file', key: 'mime_type', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'M4', name: 'Kích thước', key: 'size', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'M5', name: 'Thứ tự', key: 'order', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'M6', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'M7', name: 'Alt text', key: 'alt_text', type: 'text', required: false, enabled: true, isSystem: false },
    { id: 'M8', name: 'Mô tả', key: 'description', type: 'textarea', required: false, enabled: true, isSystem: false },

    { id: 'M11', name: 'Chiều rộng', key: 'width', type: 'number', required: false, enabled: true, isSystem: false },
    { id: 'M12', name: 'Chiều cao', key: 'height', type: 'number', required: false, enabled: true, isSystem: false },
  ]);
  

  
  // Settings
  const [settings, setSettings] = useState({
    maxFileSize: 10, // MB
    allowedTypes: ['image', 'video', 'audio', 'document'],
    itemsPerPage: 24,
  });
  
  // Allowed File Types
  const fileTypes = [
    { key: 'image', label: 'Hình ảnh', icon: Image, extensions: 'jpg, png, gif, webp, svg' },
    { key: 'video', label: 'Video', icon: Video, extensions: 'mp4, webm, avi, mov' },
    { key: 'audio', label: 'Âm thanh', icon: Music, extensions: 'mp3, wav, ogg, flac' },
    { key: 'document', label: 'Tài liệu', icon: File, extensions: 'pdf, doc, xls, ppt' },
  ];
  
  const handleToggleMediaField = (id: string) => {
    setMediaFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const handleToggleFileType = (key: string) => {
    setSettings(prev => ({
      ...prev,
      allowedTypes: prev.allowedTypes.includes(key)
        ? prev.allowedTypes.filter(t => t !== key)
        : [...prev.allowedTypes, key]
    }));
  };
  
  const requiredMediaFields = mediaFields.filter(f => f.required);
  const optionalMediaFields = mediaFields.filter(f => !f.required);
  
  return (
    <div className="space-y-6 max-w-5xl mx-auto">
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
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Image size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Thư viện Media</h1>
              <p className="text-sm text-slate-500">Quản lý file, hình ảnh và media</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors">
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
      
      {/* Settings Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Storage Settings */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <HardDrive size={14} className="text-slate-500" /> Cài đặt
          </h3>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Dung lượng tối đa (MB)</label>
              <input 
                type="number" 
                value={settings.maxFileSize}
                onChange={(e) => setSettings({...settings, maxFileSize: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
              />
            </div>
            <div>
              <label className="text-xs text-slate-500 mb-1 block">Số item / trang</label>
              <input 
                type="number" 
                value={settings.itemsPerPage}
                onChange={(e) => setSettings({...settings, itemsPerPage: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
              />
            </div>
          </div>
        </div>
        
        {/* Allowed File Types */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Shield size={14} className="text-slate-500" /> Loại file cho phép
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {fileTypes.map((type) => (
              <div key={type.key} className={`flex items-center justify-between p-2 rounded-lg transition-all ${
                settings.allowedTypes.includes(type.key)
                  ? 'bg-violet-50 dark:bg-violet-950/30 border border-violet-200 dark:border-violet-800/50'
                  : 'bg-slate-50 dark:bg-slate-950 border border-transparent'
              }`}>
                <div className="flex items-center gap-2">
                  <type.icon size={14} className={settings.allowedTypes.includes(type.key) ? 'text-violet-500' : 'text-slate-400'} />
                  <span className="text-xs text-slate-700 dark:text-slate-200">{type.label}</span>
                </div>
                <ToggleSwitch 
                  enabled={settings.allowedTypes.includes(type.key)} 
                  onChange={() => handleToggleFileType(type.key)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Media Fields */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Image size={14} className="text-violet-500" /> Trường Media
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Required */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
            {requiredMediaFields.map(field => (
              <FieldRow key={field.id} field={field} onToggle={handleToggleMediaField} />
            ))}
          </div>
          
          {/* Optional */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
            {optionalMediaFields.map(field => (
              <FieldRow key={field.id} field={field} onToggle={handleToggleMediaField} />
            ))}
          </div>
        </div>
      </div>
      
      {/* Best Practices Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Best Practices:</strong>
          <ul className="mt-1 space-y-0.5 list-disc list-inside">
            <li>Đặt tên file mô tả (vd: "san-pham-ao-xanh.jpg" thay vì "IMG1234.jpg")</li>
            <li>Luôn điền Alt text cho SEO và accessibility</li>
            <li>Nén ảnh trước khi upload để tối ưu hiệu suất</li>
          </ul>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-violet-500/10 border border-violet-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-violet-500 shrink-0 mt-0.5" />
        <p className="text-xs text-violet-600 dark:text-violet-400">
          <strong>Convention:</strong> Sử dụng <code className="bg-violet-500/20 px-1 rounded">Spatie Media Library</code> pattern. 
          Trường <code className="bg-violet-500/20 px-1 rounded">order</code> và <code className="bg-violet-500/20 px-1 rounded">active</code> bắt buộc theo Rails convention.
          Media được lưu với polymorphic relationship.
        </p>
      </div>
    </div>
  );
};

export default MediaModuleConfig;
