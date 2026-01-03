import React from 'react';
import { Plus, Search, Filter, FlaskConical, AlertCircle, ArrowLeft, Save } from 'lucide-react';
import { FeatureFlag } from '../types';
import { useNavigate, useParams, Link } from 'react-router-dom';

const mockFlags: FeatureFlag[] = [
  {
    id: '1',
    key: 'CART_MODULE',
    name: 'Cart Module',
    description: 'Bật tính năng giỏ hàng mua sắm',
    type: 'boolean',
    enabled: true,
    affectedAreas: ['Thanh toán', 'Menu'],
    lastToggledBy: 'admin',
    updatedAt: '2 giờ trước'
  },
  {
    id: '2',
    key: 'WISHLIST_MODULE',
    name: 'Danh sách yêu thích',
    description: 'Cho phép người dùng lưu sản phẩm',
    type: 'boolean',
    enabled: false,
    affectedAreas: ['Trang sản phẩm'],
    lastToggledBy: 'system',
    updatedAt: 'Chưa bao giờ'
  },
  {
    id: '3',
    key: 'NEW_CHECKOUT_FLOW',
    name: 'Luồng thanh toán mới',
    description: 'A/B test cho quy trình thanh toán rút gọn',
    type: 'percentage',
    rolloutPercentage: 50,
    enabled: true,
    affectedAreas: ['Thanh toán'],
    lastToggledBy: 'devops',
    updatedAt: '1 ngày trước'
  },
  {
    id: '4',
    key: 'REVIEWS_MODULE',
    name: 'Đánh giá sản phẩm',
    description: 'Hệ thống review và rating',
    type: 'boolean',
    enabled: false,
    affectedAreas: ['Trang sản phẩm'],
    lastToggledBy: 'admin',
    updatedAt: '5 ngày trước'
  },
];

// Sub-component: List Page
export const FeatureFlagList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="flex gap-2 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Tìm kiếm cờ..." 
              className="w-full bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md py-2 pl-9 pr-4 text-sm text-slate-700 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-600 focus:border-cyan-500/50 outline-none transition-colors"
            />
          </div>
          <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 rounded-md text-slate-600 dark:text-slate-300 text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
            <Filter size={16} /> Lọc
          </button>
        </div>
        <Link to="/features/create" className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded-md transition-colors shadow-lg shadow-cyan-900/20">
          <Plus size={16} /> Thêm Cờ Mới
        </Link>
      </div>

      <div className="grid gap-4">
        {mockFlags.map((flag) => (
          <div key={flag.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between hover:border-slate-300 dark:hover:border-slate-700 transition-all">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                {flag.type === 'percentage' && <FlaskConical size={14} className="text-amber-500 dark:text-amber-400" />}
                <h3 className="text-slate-700 dark:text-slate-200 font-mono font-medium text-sm">{flag.key}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${
                  flag.enabled 
                    ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20' 
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-500 border-slate-300 dark:border-slate-700'
                }`}>
                  {flag.enabled ? 'ĐANG BẬT' : 'ĐANG TẮT'}
                </span>
                {flag.rolloutPercentage && (
                  <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    {flag.rolloutPercentage}% Rollout
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">{flag.description}</p>
              <div className="flex items-center gap-4 mt-3 text-xs text-slate-500">
                <span>Cập nhật {flag.updatedAt} bởi <span className="text-slate-600 dark:text-slate-400">{flag.lastToggledBy}</span></span>
                <span className="w-1 h-1 bg-slate-400 dark:bg-slate-700 rounded-full"></span>
                <span className="flex items-center gap-1">
                   Ảnh hưởng: {flag.affectedAreas.join(', ')}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end border-t sm:border-t-0 border-slate-200 dark:border-slate-800 pt-3 sm:pt-0">
               {flag.key === 'CART_MODULE' && (
                 <div className="flex items-center gap-1 text-[10px] text-amber-600 dark:text-amber-400 bg-amber-100 dark:bg-amber-900/10 px-2 py-1 rounded border border-amber-300 dark:border-amber-900/20">
                   <AlertCircle size={10} />
                   Cao
                 </div>
               )}
               <div className="flex items-center bg-slate-200 dark:bg-slate-950 rounded-full p-1 border border-slate-300 dark:border-slate-800 w-12 cursor-pointer relative">
                  <div className={`w-4 h-4 rounded-full shadow-sm transition-all duration-200 ${
                    flag.enabled ? 'translate-x-6 bg-cyan-500' : 'translate-x-0 bg-slate-400 dark:bg-slate-600'
                  }`}></div>
               </div>
               <Link to={`/features/${flag.id}/edit`} className="text-xs text-cyan-600 dark:text-cyan-400 hover:text-cyan-500 dark:hover:text-cyan-300 font-medium">Sửa</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Sub-component: Form (Create/Edit)
export const FeatureFlagForm: React.FC<{ mode: 'create' | 'edit' }> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/features')} className="text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200">
          <ArrowLeft size={20} />
        </button>
        <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{mode === 'create' ? 'Tạo Cờ Tính Năng Mới' : `Chỉnh sửa Cờ: ${mockFlags[0].key}`}</h2>
      </div>

      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Mã Cờ (Key) *</label>
            <input type="text" defaultValue={mode === 'edit' ? mockFlags[0].key : ''} placeholder="VD: NEW_CHECKOUT_FLOW" className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded p-2 text-sm text-slate-700 dark:text-slate-200 font-mono focus:border-cyan-500 outline-none" disabled={mode==='edit'} />
            <p className="text-[10px] text-slate-500">UPPER_SNAKE_CASE. Không thể thay đổi sau khi tạo.</p>
          </div>
          <div className="space-y-2">
             <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Tên hiển thị *</label>
             <input type="text" defaultValue={mode === 'edit' ? mockFlags[0].name : ''} placeholder="Tên dễ đọc..." className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded p-2 text-sm text-slate-700 dark:text-slate-200 outline-none" />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Mô tả</label>
          <textarea className="w-full bg-slate-100 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded p-2 text-sm text-slate-700 dark:text-slate-200 h-20 outline-none" defaultValue={mode==='edit' ? mockFlags[0].description : ''}></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
             <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Loại Cờ</label>
             <div className="space-y-2">
               <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                 <input type="radio" name="type" defaultChecked className="accent-cyan-500" /> Boolean (Bật/Tắt)
               </label>
               <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                 <input type="radio" name="type" className="accent-cyan-500" /> Triển khai theo %
               </label>
               <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                 <input type="radio" name="type" className="accent-cyan-500" /> Theo phân khúc người dùng
               </label>
             </div>
          </div>
          <div className="space-y-3">
             <label className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase">Trạng thái mặc định</label>
             <div className="flex gap-4">
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input type="radio" name="status" defaultChecked={mode === 'create'} className="accent-cyan-500" /> Tắt (Disabled)
                </label>
                <label className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                  <input type="radio" name="status" defaultChecked={mode === 'edit' && mockFlags[0].enabled} className="accent-cyan-500" /> Bật (Enabled)
                </label>
             </div>
          </div>
        </div>

        <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex justify-end gap-3">
          <button onClick={() => navigate('/features')} className="px-4 py-2 text-sm text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors">Hủy</button>
          <button className="flex items-center gap-2 px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-medium rounded transition-colors">
            <Save size={16} /> {mode === 'create' ? 'Tạo Cờ' : 'Lưu Thay Đổi'}
          </button>
        </div>
      </div>
    </div>
  );
};
