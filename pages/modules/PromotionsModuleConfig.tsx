import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Megaphone, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  FileText,
  Layers,
  Percent,
  Calendar,
  Package
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: 'text' | 'number' | 'select' | 'boolean' | 'date';
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  number: Percent,
  select: Package,
  boolean: ToggleLeft,
  date: Calendar,
};

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'}`}
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
            ? 'bg-rose-500/10 text-rose-600 dark:text-rose-400' 
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

export const PromotionsModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [features, setFeatures] = useState({
    enableUsageLimit: true,
    enableMinOrder: true,
  });
  
  const [promotionFields, setPromotionFields] = useState<FieldConfig[]>([
    { id: 'P1', name: 'Mã khuyến mãi', key: 'code', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'P2', name: 'Loại giảm giá', key: 'discount_type', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'P3', name: 'Giá trị', key: 'discount_value', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'P4', name: 'Ngày bắt đầu', key: 'start_date', type: 'date', required: true, enabled: true, isSystem: true },
    { id: 'P5', name: 'Ngày kết thúc', key: 'end_date', type: 'date', required: true, enabled: true, isSystem: true },
    { id: 'P6', name: 'Trạng thái', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    { id: 'P7', name: 'Giới hạn lượt dùng', key: 'usage_limit', type: 'number', required: false, enabled: true, isSystem: false },
    { id: 'P8', name: 'Đơn hàng tối thiểu', key: 'min_order_value', type: 'number', required: false, enabled: true, isSystem: false },
    { id: 'P9', name: 'Mô tả', key: 'description', type: 'text', required: false, enabled: true, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    promotionsPerPage: 20,
  });
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => {
      const newValue = !(prev as any)[key];
      if (key === 'enableUsageLimit') {
        setPromotionFields(fields => fields.map(f => f.key === 'usage_limit' ? { ...f, enabled: newValue } : f));
      }
      if (key === 'enableMinOrder') {
        setPromotionFields(fields => fields.map(f => f.key === 'min_order_value' ? { ...f, enabled: newValue } : f));
      }
      return { ...prev, [key]: newValue };
    });
  };
  
  const handleToggleField = (id: string) => {
    const field = promotionFields.find(f => f.id === id);
    if (field?.key === 'usage_limit') {
      handleToggleFeature('enableUsageLimit');
    } else if (field?.key === 'min_order_value') {
      handleToggleFeature('enableMinOrder');
    } else {
      setPromotionFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    }
  };
  
  const requiredFields = promotionFields.filter(f => f.required);
  const optionalFields = promotionFields.filter(f => !f.required);
  
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
            <div className="w-12 h-12 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400 flex items-center justify-center">
              <Megaphone size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Khuyến mãi</h1>
              <p className="text-sm text-slate-500">Quản lý mã giảm giá, voucher</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium rounded-lg transition-colors">
          <Save size={16} /> Lưu thay đổi
        </button>
      </div>
      
      {/* Module Status */}
      <div className="bg-slate-100 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200 dark:bg-slate-700 text-slate-500 flex items-center justify-center">
            <Check size={16} />
          </div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-400">Module đang tắt</span>
        </div>
        <ToggleSwitch enabled={false} onChange={() => {}} />
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
              <label className="text-xs text-slate-500 mb-1 block">Số mã / trang</label>
              <input 
                type="number" 
                value={settings.promotionsPerPage}
                onChange={(e) => setSettings({...settings, promotionsPerPage: parseInt(e.target.value)})}
                className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-rose-500"
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
                  <Hash size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Giới hạn lượt dùng</span>
                </div>
                <ToggleSwitch 
                  enabled={features.enableUsageLimit} 
                  onChange={() => handleToggleFeature('enableUsageLimit')}
                />
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <div className="flex items-center gap-2">
                  <Package size={14} className="text-slate-400" />
                  <span className="text-sm text-slate-700 dark:text-slate-200">Đơn hàng tối thiểu</span>
                </div>
                <ToggleSwitch 
                  enabled={features.enableMinOrder} 
                  onChange={() => handleToggleFeature('enableMinOrder')}
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Column 2: Promotion Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Megaphone size={14} className="text-rose-500" /> Trường khuyến mãi
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
        
        {/* Column 3: Discount Types */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3">Loại giảm giá</h3>
          <div className="space-y-2">
            {[
              { key: 'percentage', label: 'Phần trăm (%)', example: '10%' },
              { key: 'fixed', label: 'Số tiền cố định', example: '50,000đ' },
            ].map((type) => (
              <div key={type.key} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <code className="text-xs text-rose-600 dark:text-rose-400">{type.key}</code>
                  <span className="text-[10px] text-slate-500">{type.example}</span>
                </div>
                <span className="text-[10px] text-slate-400">{type.label}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] text-slate-500 mt-3">
            * Mã <code className="text-rose-500">code</code> phải unique và uppercase
          </p>
        </div>
      </div>
      
      {/* Dependencies */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-2">
        <Package size={14} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-600 dark:text-amber-400">
          <strong>Phụ thuộc:</strong> Module Khuyến mãi yêu cầu module <code className="bg-amber-500/20 px-1 rounded">Sản phẩm</code> và <code className="bg-amber-500/20 px-1 rounded">Đơn hàng</code> được bật.
        </p>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Mã khuyến mãi tự động uppercase. 
          <code className="bg-blue-500/20 px-1 rounded">discount_value</code> lưu số nguyên (VND hoặc %).
        </p>
      </div>
    </div>
  );
};

export default PromotionsModuleConfig;
