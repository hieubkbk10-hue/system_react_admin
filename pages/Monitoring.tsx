import React from 'react';
import { Pause, Play, Trash2 } from 'lucide-react';

const RequestRow = ({ method, path, status, latency, size, time }: any) => {
  const getStatusColor = (s: number) => {
    if (s >= 500) return 'text-rose-400';
    if (s >= 400) return 'text-amber-400';
    if (s >= 300) return 'text-blue-400';
    return 'text-emerald-400';
  };

  return (
    <tr className="border-b border-slate-800 hover:bg-slate-800/30 transition-colors font-mono text-xs">
      <td className="py-2 px-4 text-slate-500">{time}</td>
      <td className="py-2 px-4">
        <span className={`
          px-1.5 py-0.5 rounded text-[10px] font-bold border
          ${method === 'GET' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 
            method === 'POST' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
            method === 'DELETE' ? 'bg-rose-500/10 text-rose-400 border-rose-500/20' : 'bg-slate-700 text-slate-300 border-slate-600'}
        `}>
          {method}
        </span>
      </td>
      <td className="py-2 px-4 text-slate-300">{path}</td>
      <td className={`py-2 px-4 font-bold ${getStatusColor(status)}`}>{status}</td>
      <td className="py-2 px-4 text-slate-400">{latency}</td>
      <td className="py-2 px-4 text-slate-500">{size}</td>
    </tr>
  );
};

export const Monitoring: React.FC = () => {
  return (
    <div className="space-y-6">
      
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-slate-900 p-4 rounded-lg border border-slate-800">
        <div>
           <h2 className="text-slate-100 font-semibold flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
             Luồng Request Trực tiếp
           </h2>
           <p className="text-xs text-slate-500 mt-1">Trực quan hóa lưu lượng HTTP Inbound (Lấy mẫu 10%)</p>
        </div>
        <div className="flex gap-2">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded border border-slate-700 transition-colors">
            <Pause size={12} /> Tạm dừng
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium rounded border border-slate-700 transition-colors">
            <Trash2 size={12} /> Xóa
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950 text-xs uppercase text-slate-500 font-semibold border-b border-slate-800">
                <th className="py-3 px-4 w-24">Thời gian</th>
                <th className="py-3 px-4 w-20">Method</th>
                <th className="py-3 px-4">Đường dẫn (Path)</th>
                <th className="py-3 px-4 w-20">Status</th>
                <th className="py-3 px-4 w-24">Độ trễ</th>
                <th className="py-3 px-4 w-24">Size</th>
              </tr>
            </thead>
            <tbody>
              <RequestRow time="14:32:15" method="GET" path="/api/products" status={200} latency="23ms" size="4.2KB" />
              <RequestRow time="14:32:15" method="POST" path="/api/cart/add" status={201} latency="45ms" size="0.8KB" />
              <RequestRow time="14:32:14" method="GET" path="/api/user/profile" status={200} latency="12ms" size="1.1KB" />
              <RequestRow time="14:32:14" method="GET" path="/assets/hero.webp" status={304} latency="8ms" size="-" />
              <RequestRow time="14:32:13" method="POST" path="/api/auth/refresh" status={200} latency="67ms" size="0.5KB" />
              <RequestRow time="14:32:13" method="GET" path="/api/products?cat=5" status={200} latency="34ms" size="8.9KB" />
              <RequestRow time="14:32:12" method="DELETE" path="/api/orders/123" status={403} latency="5ms" size="0.1KB" />
              <RequestRow time="14:32:11" method="GET" path="/api/admin/dashboard" status={500} latency="120ms" size="0.2KB" />
            </tbody>
          </table>
        </div>
        <div className="p-2 border-t border-slate-800 bg-slate-950 text-center">
          <span className="text-[10px] text-slate-500 font-mono">Stream kết nối qua WebSocket • 45 msg/sec</span>
        </div>
      </div>
    </div>
  );
};