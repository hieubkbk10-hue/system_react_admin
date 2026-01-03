import React from 'react';
import { Shield, Plus, Copy, RefreshCw, Trash2, Edit } from 'lucide-react';

// --- API Keys Page ---

export const ApiKeysList: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-slate-100 flex items-center gap-2">
          <Shield className="text-emerald-400" size={20} /> Quản lý API Keys
        </h2>
        <button className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-md shadow-lg shadow-emerald-900/20">
          <Plus size={16} /> Tạo Key Mới
        </button>
      </div>

      <div className="grid gap-4">
        {[
          { name: 'Mobile App Key', prefix: 'sk_live_', scopes: 'Read, Write', status: 'Active', created: '10/01/2024' },
          { name: 'Partner Integration', prefix: 'sk_live_', scopes: 'Read Only', status: 'Active', created: '15/01/2024' },
          { name: 'Dev Test Key', prefix: 'sk_test_', scopes: 'Full Access', status: 'Revoked', created: '20/01/2024' },
        ].map((key, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-lg p-5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-slate-200">{key.name}</h3>
                <span className={`text-[10px] px-2 py-0.5 rounded border ${key.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 'bg-rose-500/10 text-rose-400 border-rose-500/20'}`}>
                  {key.status === 'Active' ? 'HOẠT ĐỘNG' : 'ĐÃ HỦY'}
                </span>
              </div>
              <div className="flex items-center gap-2 font-mono text-sm text-slate-500 bg-slate-950 px-2 py-1 rounded border border-slate-800 w-fit">
                {key.prefix}••••••••••••4f2a
                <button className="text-slate-400 hover:text-white"><Copy size={12}/></button>
              </div>
              <p className="text-xs text-slate-500 mt-2">Quyền: {key.scopes} • Tạo ngày: {key.created}</p>
            </div>
            <div className="flex gap-2">
               <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded border border-transparent hover:border-slate-700 transition-colors" title="Xoay vòng Key"><RefreshCw size={16}/></button>
               <button className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded border border-transparent hover:border-slate-700 transition-colors" title="Sửa"><Edit size={16}/></button>
               <button className="p-2 text-rose-400 hover:text-rose-300 hover:bg-rose-900/20 rounded border border-transparent hover:border-rose-900/30 transition-colors" title="Thu hồi"><Trash2 size={16}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Rate Limiting Page ---

export const RateLimiting: React.FC = () => {
  return (
    <div className="space-y-6">
       <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
         <h3 className="text-slate-200 font-semibold mb-4">Cấu hình Global</h3>
         <div className="flex items-center justify-between py-3 border-b border-slate-800">
           <div>
             <div className="text-sm font-medium text-slate-300">Bật giới hạn tốc độ (Rate Limiting)</div>
             <div className="text-xs text-slate-500">Áp dụng cho toàn bộ API</div>
           </div>
           <div className="w-10 h-5 bg-cyan-600 rounded-full relative cursor-pointer"><div className="w-3 h-3 bg-white rounded-full absolute right-1 top-1"></div></div>
         </div>
         <div className="mt-4 grid grid-cols-2 gap-4">
            <div>
              <label className="text-xs text-slate-500 uppercase block mb-1">Giới hạn mặc định</label>
              <input type="text" value="100 req / phút" className="bg-slate-950 border border-slate-800 rounded p-2 text-sm w-full text-slate-300" readOnly />
            </div>
            <div>
              <label className="text-xs text-slate-500 uppercase block mb-1">Thời gian khóa (Block)</label>
              <input type="text" value="15 phút" className="bg-slate-950 border border-slate-800 rounded p-2 text-sm w-full text-slate-300" readOnly />
            </div>
         </div>
       </div>

       <div>
          <div className="flex justify-between items-center mb-4">
             <h3 className="text-slate-200 font-semibold">Quy tắc tùy chỉnh (Custom Rules)</h3>
             <button className="text-xs text-cyan-400 font-medium">+ Thêm quy tắc</button>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
             <table className="w-full text-sm text-left">
                <thead className="bg-slate-950 text-slate-500 text-xs uppercase">
                   <tr>
                     <th className="p-3">Endpoint Pattern</th>
                     <th className="p-3">Method</th>
                     <th className="p-3">Giới hạn</th>
                     <th className="p-3">Hành động</th>
                     <th className="p-3"></th>
                   </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300">
                   <tr>
                     <td className="p-3 font-mono text-cyan-400">/api/auth/*</td>
                     <td className="p-3">POST</td>
                     <td className="p-3">5 / phút</td>
                     <td className="p-3 text-rose-400">Block IP</td>
                     <td className="p-3 text-right"><button className="text-slate-500 hover:text-white">...</button></td>
                   </tr>
                   <tr>
                     <td className="p-3 font-mono text-cyan-400">/api/orders</td>
                     <td className="p-3">POST</td>
                     <td className="p-3">10 / phút</td>
                     <td className="p-3 text-rose-400">Block IP</td>
                     <td className="p-3 text-right"><button className="text-slate-500 hover:text-white">...</button></td>
                   </tr>
                   <tr>
                     <td className="p-3 font-mono text-cyan-400">/api/products/*</td>
                     <td className="p-3">GET</td>
                     <td className="p-3">200 / phút</td>
                     <td className="p-3 text-amber-400">Throttle (Làm chậm)</td>
                     <td className="p-3 text-right"><button className="text-slate-500 hover:text-white">...</button></td>
                   </tr>
                </tbody>
             </table>
          </div>
       </div>
    </div>
  );
}