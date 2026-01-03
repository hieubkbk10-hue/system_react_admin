import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  FileText, 
  FolderTree, 
  Settings, 
  Edit3, 
  Clock,
  Image,
  Tag,
  ToggleLeft,
  Check,
  Info,
  Layers,
  Hash,
  Star,
  MessageSquare
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

// Types
interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'gallery' | 'select' | 'tags' | 'date' | 'boolean';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
  linkedFeature?: string; // Link to feature toggle
  placeholder?: string;
}

// Field Type Icons
const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  textarea: FileText,
  richtext: Edit3,
  image: Image,
  gallery: Layers,
  select: FolderTree,
  tags: Tag,
  date: Clock,
  boolean: ToggleLeft,
};

// Components
const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-cyan-500' : 'bg-slate-300 dark:bg-slate-700'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
      enabled ? 'left-5' : 'left-0.5'
    }`} />
  </button>
);

const FieldRow: React.FC<{ field: FieldConfig; onToggle: (id: string) => void; color?: 'cyan' | 'emerald' }> = ({ field, onToggle, color = 'cyan' }) => {
  const TypeIcon = fieldTypeIcons[field.type] || FileText;
  const colorClasses = color === 'cyan' 
    ? 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400';
  
  return (
    <div className={`flex items-center justify-between p-2.5 rounded-lg border transition-all ${
      field.enabled 
        ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
        : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-50'
    }`}>
      <div className="flex items-center gap-2.5">
        <div className={`w-7 h-7 rounded flex items-center justify-center ${
          field.enabled ? colorClasses : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
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

// Main Component
export const PostsModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  // Features - these control linked fields
  const [features, setFeatures] = useState({
    enableTags: true,
    enableFeatured: true,
    enableScheduling: true,
  });
  
  // Post Fields
  const [postFields, setPostFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'P1', name: 'Tiêu đề', key: 'title', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'P2', name: 'Nội dung', key: 'content', type: 'richtext', required: true, enabled: true, isSystem: true },
    { id: 'P3', name: 'Thứ tự', key: 'order', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'P4', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'P5', name: 'Mô tả ngắn', key: 'excerpt', type: 'textarea', required: false, enabled: true, isSystem: false },
    { id: 'P6', name: 'Ảnh đại diện', key: 'thumbnail', type: 'image', required: false, enabled: true, isSystem: false },
    { id: 'P7', name: 'Danh mục', key: 'category', type: 'select', required: false, enabled: true, isSystem: false },
    // Linked to features
    { id: 'P8', name: 'Tags', key: 'tags', type: 'tags', required: false, enabled: true, isSystem: false, linkedFeature: 'enableTags' },
    { id: 'P9', name: 'Nổi bật', key: 'featured', type: 'boolean', required: false, enabled: true, isSystem: false, linkedFeature: 'enableFeatured' },
    { id: 'P10', name: 'Ngày xuất bản', key: 'publishDate', type: 'date', required: false, enabled: true, isSystem: false, linkedFeature: 'enableScheduling' },
  ]);
  
  // Category Fields
  const [categoryFields, setCategoryFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'C1', name: 'Tên', key: 'name', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'C2', name: 'Thứ tự', key: 'order', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'C3', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'C4', name: 'Mô tả', key: 'description', type: 'textarea', required: false, enabled: true, isSystem: false },
    { id: 'C5', name: 'Ảnh đại diện', key: 'thumbnail', type: 'image', required: false, enabled: false, isSystem: false },
  ]);
  

  
  // Settings
  const [settings, setSettings] = useState({
    postsPerPage: 10,
    defaultStatus: 'draft',
  });
  
  // Sync features with linked fields
  useEffect(() => {
    setPostFields(prev => prev.map(field => {
      if (field.linkedFeature) {
        return { ...field, enabled: (features as any)[field.linkedFeature] };
      }
      return field;
    }));
  }, [features]);
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => ({ ...prev, [key]: !(prev as any)[key] }));
  };
  
  const handleTogglePostField = (id: string) => {
    const field = postFields.find(f => f.id === id);
    if (field?.linkedFeature) {
      // Toggle feature instead, which will sync the field
      handleToggleFeature(field.linkedFeature);
    } else {
      setPostFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    }
  };
  
  const handleToggleCategoryField = (id: string) => {
    setCategoryFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const requiredPostFields = postFields.filter(f => f.required);
  const optionalPostFields = postFields.filter(f => !f.required);
  const requiredCategoryFields = categoryFields.filter(f => f.required);
  const optionalCategoryFields = categoryFields.filter(f => !f.required);
  
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
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 flex items-center justify-center">
              <FileText size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Bài viết</h1>
              <p className="text-sm text-slate-500">Cấu hình bài viết và danh mục</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-lg transition-colors">
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
          {/* General Settings */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Settings size={14} className="text-slate-500" /> Cài đặt
            </h3>
            
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Số bài / trang</label>
                <input 
                  type="number" 
                  value={settings.postsPerPage}
                  onChange={(e) => setSettings({...settings, postsPerPage: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Trạng thái mặc định</label>
                <select 
                  value={settings.defaultStatus}
                  onChange={(e) => setSettings({...settings, defaultStatus: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-cyan-500"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Layers size={14} className="text-slate-500" /> Tính năng
            </h3>
            
            <div className="space-y-2">
              {[
                { key: 'enableTags', label: 'Tags', icon: Tag },
                { key: 'enableFeatured', label: 'Nổi bật', icon: Star },
                { key: 'enableScheduling', label: 'Hẹn giờ', icon: Clock },
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <div className="flex items-center gap-2">
                    <feature.icon size={14} className="text-slate-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-200">{feature.label}</span>
                  </div>
                  <ToggleSwitch 
                    enabled={(features as any)[feature.key]} 
                    onChange={() => handleToggleFeature(feature.key)}
                  />
                </div>
              ))}
            </div>
            
            <p className="text-[10px] text-slate-400 mt-3">
              * Bật/tắt tính năng sẽ tự động bật/tắt trường tương ứng
            </p>
          </div>
        </div>
        
        {/* Column 2: Post Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <FileText size={14} className="text-cyan-500" /> Trường bài viết
          </h3>
          
          <div className="space-y-3">
            {/* Required */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredPostFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleTogglePostField} color="cyan" />
              ))}
            </div>
            
            {/* Optional */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
              {optionalPostFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleTogglePostField} color="cyan" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Column 3: Category Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <FolderTree size={14} className="text-emerald-500" /> Trường danh mục
          </h3>
          
          <div className="space-y-3">
            {/* Required */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredCategoryFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleCategoryField} color="emerald" />
              ))}
            </div>
            
            {/* Optional */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
              {optionalCategoryFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleCategoryField} color="emerald" />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Sub-module Info */}
      <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Layers size={14} className="text-slate-500" /> Module phụ thuộc
        </h3>
        <div className="flex items-center justify-between p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <MessageSquare size={14} className="text-amber-500" />
            <span className="text-sm text-slate-700 dark:text-slate-200">Bình luận</span>
          </div>
          <a href="#/modules/comments" className="text-[11px] text-cyan-600 dark:text-cyan-400 hover:underline">Cấu hình →</a>
        </div>
        <p className="text-[10px] text-slate-500 mt-2">
          * Module Bình luận đã được tách riêng theo Single Responsibility Principle
        </p>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Slug tự động từ tiêu đề/tên. Trường <code className="bg-blue-500/20 px-1 rounded">order</code> và <code className="bg-blue-500/20 px-1 rounded">active</code> bắt buộc theo Rails convention.
        </p>
      </div>
    </div>
  );
};

export default PostsModuleConfig;
