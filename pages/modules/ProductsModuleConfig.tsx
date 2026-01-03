import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Package, 
  FolderTree, 
  Settings, 
  Clock,
  Image,
  Tag,
  ToggleLeft,
  Check,
  Info,
  Layers,
  Hash,
  Star,
  DollarSign,
  Boxes,
  Palette,
  Ruler,
  FileText,
  Percent,
  BarChart3
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'textarea' | 'richtext' | 'image' | 'gallery' | 'select' | 'tags' | 'date' | 'boolean' | 'number' | 'price';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
  linkedFeature?: string;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  textarea: FileText,
  richtext: FileText,
  image: Image,
  gallery: Layers,
  select: FolderTree,
  tags: Tag,
  date: Clock,
  boolean: ToggleLeft,
  number: Hash,
  price: DollarSign,
};

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-emerald-500' : 'bg-slate-300 dark:bg-slate-700'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
      enabled ? 'left-5' : 'left-0.5'
    }`} />
  </button>
);

const FieldRow: React.FC<{ field: FieldConfig; onToggle: (id: string) => void; color?: 'emerald' | 'amber' }> = ({ field, onToggle, color = 'emerald' }) => {
  const TypeIcon = fieldTypeIcons[field.type] || FileText;
  const colorClasses = color === 'emerald' 
    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400';
  
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
            {field.linkedFeature && (
              <span className="text-[8px] px-1 py-0.5 rounded bg-blue-500/10 text-blue-500">LINKED</span>
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

export const ProductsModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [features, setFeatures] = useState({
    enableVariants: true,
    enableInventory: true,
    enableSale: true,
    enableSEO: true,
    enableReviews: false,
  });
  
  const [productFields, setProductFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'P1', name: 'Tên sản phẩm', key: 'name', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'P2', name: 'Giá bán', key: 'price', type: 'price', required: true, enabled: true, isSystem: true },
    { id: 'P3', name: 'Mô tả', key: 'description', type: 'richtext', required: true, enabled: true, isSystem: true },
    { id: 'P4', name: 'Thứ tự', key: 'order', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'P5', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'P6', name: 'Mô tả ngắn', key: 'excerpt', type: 'textarea', required: false, enabled: true, isSystem: false },
    { id: 'P7', name: 'Ảnh đại diện', key: 'thumbnail', type: 'image', required: false, enabled: true, isSystem: false },
    { id: 'P8', name: 'Thư viện ảnh', key: 'gallery', type: 'gallery', required: false, enabled: true, isSystem: false },
    { id: 'P9', name: 'Danh mục', key: 'category_id', type: 'select', required: false, enabled: true, isSystem: false },
    // Linked to features
    { id: 'P10', name: 'Mã SKU', key: 'sku', type: 'text', required: false, enabled: true, isSystem: false },
    { id: 'P11', name: 'Số lượng tồn', key: 'stock', type: 'number', required: false, enabled: true, isSystem: false, linkedFeature: 'enableInventory' },
    { id: 'P12', name: 'Giá gốc', key: 'compare_price', type: 'price', required: false, enabled: true, isSystem: false, linkedFeature: 'enableSale' },
    { id: 'P13', name: 'Biến thể', key: 'variants', type: 'select', required: false, enabled: true, isSystem: false, linkedFeature: 'enableVariants' },
    { id: 'P14', name: 'Meta Title', key: 'meta_title', type: 'text', required: false, enabled: true, isSystem: false, linkedFeature: 'enableSEO' },
    { id: 'P15', name: 'Meta Description', key: 'meta_description', type: 'textarea', required: false, enabled: true, isSystem: false, linkedFeature: 'enableSEO' },
  ]);
  
  const [categoryFields, setCategoryFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'C1', name: 'Tên', key: 'name', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'C2', name: 'Thứ tự', key: 'order', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'C3', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'C4', name: 'Mô tả', key: 'description', type: 'textarea', required: false, enabled: true, isSystem: false },
    { id: 'C5', name: 'Ảnh đại diện', key: 'thumbnail', type: 'image', required: false, enabled: false, isSystem: false },
    { id: 'C6', name: 'Danh mục cha', key: 'parent_id', type: 'select', required: false, enabled: true, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    productsPerPage: 12,
    defaultStatus: 'draft',
    enableOutOfStock: true,
  });
  
  useEffect(() => {
    setProductFields(prev => prev.map(field => {
      if (field.linkedFeature) {
        return { ...field, enabled: (features as any)[field.linkedFeature] };
      }
      return field;
    }));
  }, [features]);
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => ({ ...prev, [key]: !(prev as any)[key] }));
  };
  
  const handleToggleProductField = (id: string) => {
    const field = productFields.find(f => f.id === id);
    if (field?.linkedFeature) {
      handleToggleFeature(field.linkedFeature);
    } else {
      setProductFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    }
  };
  
  const handleToggleCategoryField = (id: string) => {
    setCategoryFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const requiredProductFields = productFields.filter(f => f.required);
  const optionalProductFields = productFields.filter(f => !f.required);
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
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <Package size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Sản phẩm</h1>
              <p className="text-sm text-slate-500">Cấu hình sản phẩm và danh mục sản phẩm</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-lg transition-colors">
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
                <label className="text-xs text-slate-500 mb-1 block">Số SP / trang</label>
                <input 
                  type="number" 
                  value={settings.productsPerPage}
                  onChange={(e) => setSettings({...settings, productsPerPage: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Trạng thái mặc định</label>
                <select 
                  value={settings.defaultStatus}
                  onChange={(e) => setSettings({...settings, defaultStatus: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-emerald-500"
                >
                  <option value="draft">Bản nháp</option>
                  <option value="published">Xuất bản</option>
                </select>
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <span className="text-xs text-slate-700 dark:text-slate-200">Hiện SP hết hàng</span>
                <ToggleSwitch 
                  enabled={settings.enableOutOfStock} 
                  onChange={() => setSettings({...settings, enableOutOfStock: !settings.enableOutOfStock})}
                />
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
                { key: 'enableVariants', label: 'Biến thể SP', icon: Palette, desc: 'Size, màu sắc...' },
                { key: 'enableInventory', label: 'Quản lý tồn kho', icon: Boxes, desc: 'SKU, số lượng' },
                { key: 'enableSale', label: 'Giá khuyến mãi', icon: Percent, desc: 'Giá gốc, giảm giá' },
                { key: 'enableSEO', label: 'SEO', icon: BarChart3, desc: 'Meta title, desc' },
                { key: 'enableReviews', label: 'Đánh giá SP', icon: Star, desc: 'Review từ KH' },
              ].map((feature) => (
                <div key={feature.key} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <div className="flex items-center gap-2">
                    <feature.icon size={14} className="text-slate-400" />
                    <div>
                      <span className="text-sm text-slate-700 dark:text-slate-200 block">{feature.label}</span>
                      <span className="text-[10px] text-slate-400">{feature.desc}</span>
                    </div>
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
        
        {/* Column 2: Product Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Package size={14} className="text-emerald-500" /> Trường sản phẩm
          </h3>
          
          <div className="space-y-3">
            {/* Required */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredProductFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleProductField} color="emerald" />
              ))}
            </div>
            
            {/* Optional */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
              {optionalProductFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleProductField} color="emerald" />
              ))}
            </div>
          </div>
        </div>
        
        {/* Column 3: Category Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <FolderTree size={14} className="text-amber-500" /> Trường danh mục
          </h3>
          
          <div className="space-y-3">
            {/* Required */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredCategoryFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleCategoryField} color="amber" />
              ))}
            </div>
            
            {/* Optional */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
              {optionalCategoryFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleCategoryField} color="amber" />
              ))}
            </div>
          </div>
          
          {/* Nested Category Info */}
          <div className="mt-4 p-2 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
            <p className="text-[10px] text-amber-600 dark:text-amber-400">
              <strong>Lưu ý:</strong> Danh mục hỗ trợ cấu trúc phân cấp (nested) qua trường <code className="bg-amber-500/20 px-1 rounded">parent_id</code>
            </p>
          </div>
        </div>
      </div>
      
      {/* Sub-modules Info */}
      <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
          <Layers size={14} className="text-slate-500" /> Module phụ thuộc
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { name: 'Giỏ hàng', key: 'cart', enabled: true },
            { name: 'SP Yêu thích', key: 'wishlist', enabled: false },
            { name: 'Đơn hàng', key: 'orders', enabled: true },
          ].map((sub) => (
            <div key={sub.key} className={`flex items-center justify-between p-3 rounded-lg border ${
              sub.enabled 
                ? 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800' 
                : 'bg-slate-50 dark:bg-slate-900/50 border-slate-200 dark:border-slate-800 opacity-60'
            }`}>
              <span className="text-sm text-slate-700 dark:text-slate-200">{sub.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                sub.enabled 
                  ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' 
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}>
                {sub.enabled ? 'Bật' : 'Tắt'}
              </span>
            </div>
          ))}
        </div>
        <p className="text-[10px] text-slate-500 mt-2">
          * Các module phụ thuộc sẽ tự động tắt nếu module Sản phẩm bị tắt
        </p>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Slug tự động từ tên SP. Trường <code className="bg-blue-500/20 px-1 rounded">order</code> và <code className="bg-blue-500/20 px-1 rounded">active</code> bắt buộc theo Rails convention. 
          Giá lưu dạng integer (VND, không có thập phân).
        </p>
      </div>
    </div>
  );
};

export default ProductsModuleConfig;
