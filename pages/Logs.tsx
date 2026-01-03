import React from 'react';
import { Download, RefreshCw, Search } from 'lucide-react';
import { LogEntry } from '../types';

const mockLogs: LogEntry[] = [
  { id: '1', timestamp: '14:32:15.234', level: 'ERROR', source: 'api/orders', message: 'Payment gateway timeout', latency: '4500ms' },
  { id: '2', timestamp: '14:32:10.102', level: 'WARN', source: 'scheduler', message: 'Slow query detected (>2s)', latency: '2340ms' },
  { id: '3', timestamp: '14:32:05.891', level: 'INFO', source: 'api/auth', message: 'User login successful: john@example.com', latency: '120ms' },
  { id: '4', timestamp: '14:32:01.445', level: 'DEBUG', source: 'cache', message: 'Cache hit: product_list_page_1', latency: '2ms' },
  { id: '5', timestamp: '14:31:58.223', level: 'INFO', source: 'api/products', message: 'Product created: SKU-12345', latency: '340ms' },
  { id: '6', timestamp: '14:31:55.100', level: 'INFO', source: 'lb-main', message: 'Health check passed', latency: '10ms' },
];

export const Logs: React.FC = () => {
  const getLevelColor = (l: string) => {
    switch(l) {
      case 'ERROR': return 'text-rose-400';
      case 'WARN': return 'text-amber-400';
      case 'DEBUG': return 'text-purple-400';
      default: return 'text-cyan-400';
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
      
      {/* Log Controls */}
      <div className="p-3 border-b border-slate-800 flex justify-between items-center bg-slate-900">
        <div className="flex gap-2">
          <div className="relative">
             <Search size={14} className="absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-500" />
             <input type="text" placeholder="Lọc nhật ký..." className="bg-slate-950 border border-slate-800 rounded text-xs py-1.5 pl-8 pr-3 w-64 text-slate-200 focus:border-cyan-500/50 outline-none" />
          </div>
          <select className="bg-slate-950 border border-slate-800 rounded text-xs py-1.5 px-2 text-slate-300 outline-none focus:border-cyan-500/50">
            <option>Tất cả mức độ</option>
            <option>Error</option>
            <option>Warning</option>
          </select>
        </div>
        <div className="flex gap-2">
           <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"><RefreshCw size={16} /></button>
           <button className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded"><Download size={16} /></button>
        </div>
      </div>

      {/* Log Console */}
      <div className="flex-1 overflow-y-auto p-4 font-mono text-xs bg-slate-950 custom-scrollbar">
        {mockLogs.map((log) => (
          <div key={log.id} className="flex gap-4 mb-1.5 hover:bg-slate-900/50 p-1 rounded -mx-1 px-2 group">
            <span className="text-slate-500 shrink-0 w-24">{log.timestamp}</span>
            <span className={`font-bold w-12 shrink-0 ${getLevelColor(log.level)}`}>{log.level}</span>
            <span className="text-purple-300 w-24 shrink-0 truncate" title={log.source}>{log.source}</span>
            <span className="text-slate-300 flex-1 break-all">{log.message}</span>
            {log.latency && <span className="text-slate-600 text-right w-16 group-hover:text-slate-400">{log.latency}</span>}
          </div>
        ))}
        <div className="text-slate-600 mt-4 italic text-center">-- Kết thúc luồng trực tiếp --</div>
      </div>
      
    </div>
  );
};