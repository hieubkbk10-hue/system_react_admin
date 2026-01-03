import React from 'react';
import { ArrowLeft, Database, FileText, HardDrive, Download } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell } from 'recharts';

// --- Components ---

const UsageCard = ({ title, used, total, unit, percent, color }: any) => (
  <div className="bg-slate-900 border border-slate-800 rounded-lg p-5">
    <div className="flex justify-between mb-2">
      <h3 className="text-slate-300 text-sm font-medium uppercase">{title}</h3>
      <span className="text-slate-500 text-xs">{percent}%</span>
    </div>
    <div className="text-2xl font-mono font-bold text-slate-100 mb-2">
      {used} <span className="text-sm text-slate-500 font-sans">/ {total} {unit}</span>
    </div>
    <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden">
      <div className={`h-full rounded-full ${color}`} style={{ width: `${percent}%` }}></div>
    </div>
  </div>
);

// --- Sub-Pages ---

export const UsageOverview: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
         <h2 className="text-lg font-semibold text-slate-100">Storage & Bandwidth Overview</h2>
         <button className="text-xs flex items-center gap-2 px-3 py-2 bg-slate-900 border border-slate-800 rounded hover:bg-slate-800 text-slate-300">
           <Download size={14} /> Export Report
         </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-cyan-400 font-medium mb-2">
            <Database size={18} /> Database Storage
          </div>
          <UsageCard title="Disk Usage" used="2.4" total="10" unit="GB" percent={24} color="bg-cyan-500" />
          <UsageCard title="Active Connections" used="45" total="100" unit="conn" percent={45} color="bg-cyan-500" />
          <button onClick={() => navigate('/monitoring/usage/database-storage')} className="text-xs text-cyan-400 hover:text-cyan-300">View Database Details &rarr;</button>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-2 text-emerald-400 font-medium mb-2">
            <FileText size={18} /> File Storage (S3)
          </div>
          <UsageCard title="Total Storage" used="8.7" total="50" unit="GB" percent={17} color="bg-emerald-500" />
          <UsageCard title="CDN Bandwidth" used="125" total="1000" unit="GB" percent={12} color="bg-emerald-500" />
          <button onClick={() => navigate('/monitoring/usage/file-storage')} className="text-xs text-emerald-400 hover:text-emerald-300">View File Details &rarr;</button>
        </div>
      </div>
    </div>
  );
};

export const DatabaseStorageDetail: React.FC = () => {
  const navigate = useNavigate();
  const data = [
    { name: 'Products', value: 856 },
    { name: 'Orders', value: 623 },
    { name: 'Logs', value: 412 },
    { name: 'Users', value: 234 },
  ];
  const COLORS = ['#22d3ee', '#34d399', '#fbbf24', '#f87171'];

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/monitoring/usage')} className="text-slate-400 hover:text-slate-200"><ArrowLeft size={20}/></button>
        <h2 className="text-xl font-bold text-slate-100">Database Storage Details</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-lg p-6">
          <h3 className="text-sm font-semibold text-slate-300 mb-4">Top Tables by Size (MB)</h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
               <PieChart>
                 <Pie data={data} innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value">
                   {data.map((entry, index) => (
                     <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                   ))}
                 </Pie>
                 <Tooltip contentStyle={{backgroundColor: '#0f172a', borderColor: '#334155'}} />
               </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 text-xs text-slate-400 mt-2">
            {data.map((d, i) => (
              <div key={i} className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full" style={{backgroundColor: COLORS[i]}}></span>
                {d.name}
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-slate-900 border border-slate-800 rounded-lg p-6">
           <h3 className="text-sm font-semibold text-slate-300 mb-4">Optimization Tips</h3>
           <ul className="space-y-4 text-sm">
             <li className="p-3 bg-amber-900/10 border border-amber-900/20 rounded-md">
               <span className="text-amber-400 font-bold block mb-1">Clean up Logs</span>
               <span className="text-slate-400">Table `activity_logs` has 45k rows older than 90 days. Can free up ~76MB.</span>
             </li>
             <li className="p-3 bg-blue-900/10 border border-blue-900/20 rounded-md">
               <span className="text-blue-400 font-bold block mb-1">Missing Index</span>
               <span className="text-slate-400">Full scan query detected on `products`. Add index to `category_id`.</span>
             </li>
           </ul>
        </div>
      </div>
    </div>
  );
};

export const FileStorageDetail: React.FC = () => {
    const navigate = useNavigate();
    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <button onClick={() => navigate('/monitoring/usage')} className="text-slate-400 hover:text-slate-200"><ArrowLeft size={20}/></button>
                <h2 className="text-xl font-bold text-slate-100">File Storage Details (S3)</h2>
            </div>
            
            <div className="bg-slate-900 border border-slate-800 rounded-lg overflow-hidden">
                <table className="w-full text-left text-sm">
                    <thead className="bg-slate-950 text-slate-500 uppercase text-xs">
                        <tr>
                            <th className="p-4">File Type</th>
                            <th className="p-4">Count</th>
                            <th className="p-4">Size</th>
                            <th className="p-4">Usage %</th>
                            <th className="p-4">Growth (MoM)</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 text-slate-300">
                        <tr>
                            <td className="p-4">Images (JPG/PNG)</td>
                            <td className="p-4">12,456</td>
                            <td className="p-4">6.2 GB</td>
                            <td className="p-4"><span className="w-16 block h-1.5 rounded-full bg-slate-700 overflow-hidden"><span className="block h-full bg-cyan-500 w-[71%]"></span></span></td>
                            <td className="p-4 text-emerald-400">+12%</td>
                        </tr>
                        <tr>
                            <td className="p-4">Videos (MP4)</td>
                            <td className="p-4">456</td>
                            <td className="p-4">1.8 GB</td>
                            <td className="p-4"><span className="w-16 block h-1.5 rounded-full bg-slate-700 overflow-hidden"><span className="block h-full bg-cyan-500 w-[21%]"></span></span></td>
                            <td className="p-4 text-emerald-400">+8%</td>
                        </tr>
                        <tr>
                            <td className="p-4">Documents (PDF)</td>
                            <td className="p-4">1,234</td>
                            <td className="p-4">0.5 GB</td>
                            <td className="p-4"><span className="w-16 block h-1.5 rounded-full bg-slate-700 overflow-hidden"><span className="block h-full bg-cyan-500 w-[6%]"></span></span></td>
                            <td className="p-4 text-emerald-400">+3%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
}