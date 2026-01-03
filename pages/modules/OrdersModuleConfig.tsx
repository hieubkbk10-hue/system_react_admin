import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  ShoppingBag, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Hash,
  FileText,
  Package,
  AlertTriangle,
  Truck,
  CreditCard,
  MapPin,
  Clock,
  Users
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
  linkedFeature?: string;
}

const fieldTypeIcons: Record<string, any> = {
  text: Hash,
  textarea: FileText,
  number: Hash,
  boolean: ToggleLeft,
  select: Package,
  date: Clock,
  address: MapPin,
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
          field.enabled ? 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400' : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
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

export const OrdersModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [features, setFeatures] = useState({
    enableShipping: true,
    enablePayment: true,
    enableInvoice: false,
    enableTracking: true,
  });
  
  const [orderFields, setOrderFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'O1', name: 'Mã đơn hàng', key: 'order_number', type: 'text', required: true, enabled: true, isSystem: true },
    { id: 'O2', name: 'Khách hàng', key: 'customer_id', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'O3', name: 'Tổng tiền', key: 'total', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'O4', name: 'Trạng thái', key: 'status', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'O5', name: 'Thứ tự', key: 'order', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'O6', name: 'Active', key: 'active', type: 'boolean', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'O7', name: 'Ghi chú', key: 'note', type: 'textarea', required: false, enabled: true, isSystem: false },
    { id: 'O8', name: 'Địa chỉ giao', key: 'shipping_address', type: 'address', required: false, enabled: true, isSystem: false, linkedFeature: 'enableShipping' },
    { id: 'O9', name: 'Phí ship', key: 'shipping_fee', type: 'number', required: false, enabled: true, isSystem: false, linkedFeature: 'enableShipping' },
    { id: 'O10', name: 'Mã vận đơn', key: 'tracking_code', type: 'text', required: false, enabled: true, isSystem: false, linkedFeature: 'enableTracking' },
    { id: 'O11', name: 'PT Thanh toán', key: 'payment_method', type: 'select', required: false, enabled: true, isSystem: false, linkedFeature: 'enablePayment' },
    { id: 'O12', name: 'TT Thanh toán', key: 'payment_status', type: 'select', required: false, enabled: true, isSystem: false, linkedFeature: 'enablePayment' },
  ]);
  
  const [orderItemFields, setOrderItemFields] = useState<FieldConfig[]>([
    // Required (system)
    { id: 'OI1', name: 'Sản phẩm', key: 'product_id', type: 'select', required: true, enabled: true, isSystem: true },
    { id: 'OI2', name: 'Số lượng', key: 'quantity', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'OI3', name: 'Đơn giá', key: 'price', type: 'number', required: true, enabled: true, isSystem: true },
    { id: 'OI4', name: 'Thành tiền', key: 'subtotal', type: 'number', required: true, enabled: true, isSystem: true },
    // Optional
    { id: 'OI5', name: 'Biến thể', key: 'variant_id', type: 'select', required: false, enabled: true, isSystem: false },
  ]);
  
  const [settings, setSettings] = useState({
    orderPrefix: 'ORD',
    autoConfirm: false,
    enableGuestCheckout: true,
  });
  
  const [orderStatuses] = useState([
    { key: 'pending', label: 'Chờ xử lý', color: 'amber' },
    { key: 'confirmed', label: 'Đã xác nhận', color: 'blue' },
    { key: 'processing', label: 'Đang xử lý', color: 'indigo' },
    { key: 'shipping', label: 'Đang giao', color: 'purple' },
    { key: 'delivered', label: 'Đã giao', color: 'emerald' },
    { key: 'cancelled', label: 'Đã hủy', color: 'rose' },
  ]);
  
  // Sync features with linked fields
  React.useEffect(() => {
    setOrderFields(prev => prev.map(field => {
      if (field.linkedFeature) {
        return { ...field, enabled: (features as any)[field.linkedFeature] };
      }
      return field;
    }));
  }, [features]);
  
  const handleToggleFeature = (key: string) => {
    setFeatures(prev => ({ ...prev, [key]: !(prev as any)[key] }));
  };
  
  const handleToggleOrderField = (id: string) => {
    const field = orderFields.find(f => f.id === id);
    if (field?.linkedFeature) {
      handleToggleFeature(field.linkedFeature);
    } else {
      setOrderFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
    }
  };
  
  const handleToggleOrderItemField = (id: string) => {
    setOrderItemFields(prev => prev.map(f => f.id === id ? { ...f, enabled: !f.enabled } : f));
  };
  
  const requiredOrderFields = orderFields.filter(f => f.required);
  const optionalOrderFields = orderFields.filter(f => !f.required);
  
  return (
    <div className="space-y-6 max-w-6xl mx-auto">
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
              <ShoppingBag size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Đơn hàng</h1>
              <p className="text-sm text-slate-500">Quản lý đơn hàng và vận chuyển</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium rounded-lg transition-colors">
          <Save size={16} /> Lưu thay đổi
        </button>
      </div>
      
      {/* Dependency Warning */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3 flex items-start gap-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={16} />
        <div>
          <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">Module phụ thuộc</h4>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
            Module này phụ thuộc vào <Link to="/modules/products" className="underline font-medium">Module Sản phẩm</Link> và 
            <span className="font-medium"> Module Khách hàng</span>. Nếu tắt các module này, module Đơn hàng sẽ bị ảnh hưởng.
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
                <label className="text-xs text-slate-500 mb-1 block">Tiền tố mã đơn</label>
                <input 
                  type="text" 
                  value={settings.orderPrefix}
                  onChange={(e) => setSettings({...settings, orderPrefix: e.target.value})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-indigo-500"
                />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <span className="text-xs text-slate-700 dark:text-slate-200">Tự động xác nhận</span>
                <ToggleSwitch 
                  enabled={settings.autoConfirm} 
                  onChange={() => setSettings({...settings, autoConfirm: !settings.autoConfirm})}
                />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <span className="text-xs text-slate-700 dark:text-slate-200">Cho phép guest checkout</span>
                <ToggleSwitch 
                  enabled={settings.enableGuestCheckout} 
                  onChange={() => setSettings({...settings, enableGuestCheckout: !settings.enableGuestCheckout})}
                />
              </div>
            </div>
          </div>
          
          {/* Features */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Package size={14} className="text-slate-500" /> Tính năng
            </h3>
            
            <div className="space-y-2">
              {[
                { key: 'enableShipping', label: 'Vận chuyển', icon: Truck },
                { key: 'enablePayment', label: 'Thanh toán', icon: CreditCard },
                { key: 'enableTracking', label: 'Theo dõi đơn', icon: MapPin },
                { key: 'enableInvoice', label: 'Hóa đơn', icon: FileText },
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
          </div>
          
          {/* Order Statuses */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Clock size={14} className="text-slate-500" /> Trạng thái đơn hàng
            </h3>
            
            <div className="space-y-1.5">
              {orderStatuses.map((status, index) => (
                <div key={status.key} className="flex items-center gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                  <span className="text-xs text-slate-400 w-4">{index + 1}.</span>
                  <span className={`w-2 h-2 rounded-full bg-${status.color}-500`}></span>
                  <span className="text-xs text-slate-700 dark:text-slate-200 flex-1">{status.label}</span>
                  <code className="text-[9px] text-slate-400">{status.key}</code>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Column 2: Order Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <ShoppingBag size={14} className="text-indigo-500" /> Trường đơn hàng
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {requiredOrderFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleOrderField} />
              ))}
            </div>
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
              {optionalOrderFields.map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleOrderField} />
              ))}
            </div>
          </div>
        </div>
        
        {/* Column 3: Order Item Fields */}
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
            <Package size={14} className="text-purple-500" /> Trường chi tiết đơn
          </h3>
          
          <div className="space-y-3">
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Bắt buộc</span>
              {orderItemFields.filter(f => f.required).map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleOrderItemField} />
              ))}
            </div>
            
            <div className="space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase">Tùy chọn</span>
              {orderItemFields.filter(f => !f.required).map(field => (
                <FieldRow key={field.id} field={field} onToggle={handleToggleOrderItemField} />
              ))}
            </div>
          </div>
          
          {/* Relationship Info */}
          <div className="mt-4 p-2 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50">
            <p className="text-[10px] text-purple-600 dark:text-purple-400">
              <strong>Relationship:</strong> Order hasMany OrderItems. Mỗi OrderItem belongsTo Product.
            </p>
          </div>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Convention:</strong> Mã đơn tự động: <code className="bg-blue-500/20 px-1 rounded">{settings.orderPrefix}-YYYYMMDD-XXXX</code>. 
          Giá snapshot tại thời điểm đặt hàng. Trạng thái theo state machine pattern.
        </p>
      </div>
    </div>
  );
};

export default OrdersModuleConfig;
