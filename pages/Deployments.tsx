import React from 'react';
import { GitCommit, CheckCircle, XCircle, Clock, RotateCcw } from 'lucide-react';
import { Deployment } from '../types';

const mockDeployments: Deployment[] = [
    { id: '1', version: 'v2.4.1', status: 'current', deployedAt: 'Vừa xong', author: 'admin', commitHash: 'a1b2c3d' },
    { id: '2', version: 'v2.4.0', status: 'previous', deployedAt: '2 ngày trước', author: 'admin', commitHash: 'f4e5d6' },
    { id: '3', version: 'v2.3.9', status: 'previous', deployedAt: '5 ngày trước', author: 'devops', commitHash: '9a8b7c' },
    { id: '4', version: 'v2.3.8', status: 'failed', deployedAt: '1 tuần trước', author: 'dev_team', commitHash: '1x2y3z' },
];

export const Deployments: React.FC = () => {
    return (
        <div className="space-y-6">
            <h2 className="text-lg font-semibold text-slate-100">Lịch sử Triển khai</h2>
            
            <div className="bg-slate-900 border border-slate-800 rounded-lg p-6 mb-6">
                <h3 className="text-xs font-semibold text-slate-500 uppercase mb-4">Phiên bản hiện tại</h3>
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                        <CheckCircle size={24} />
                    </div>
                    <div>
                        <div className="text-xl font-mono font-bold text-slate-100">v2.4.1</div>
                        <div className="text-xs text-slate-400 flex items-center gap-2 mt-1">
                            <span><GitCommit size={12} className="inline"/> a1b2c3d</span>
                            <span>•</span>
                            <span>Deployed by admin</span>
                            <span>•</span>
                            <span className="text-emerald-400">Running stable</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="space-y-4">
                <h3 className="text-xs font-semibold text-slate-500 uppercase">Lịch sử</h3>
                {mockDeployments.slice(1).map((deploy) => (
                    <div key={deploy.id} className="bg-slate-900 border border-slate-800 rounded-lg p-4 flex items-center justify-between hover:border-slate-700 transition-colors group">
                        <div className="flex items-center gap-4">
                            <div className={`p-2 rounded border ${
                                deploy.status === 'failed' ? 'bg-rose-500/10 border-rose-500/20 text-rose-400' : 'bg-slate-800 border-slate-700 text-slate-400'
                            }`}>
                                {deploy.status === 'failed' ? <XCircle size={18} /> : <Clock size={18} />}
                            </div>
                            <div>
                                <div className="text-sm font-medium text-slate-200">{deploy.version}</div>
                                <div className="text-xs text-slate-500 flex items-center gap-2">
                                    <span className="font-mono text-slate-400">{deploy.commitHash}</span>
                                    <span>•</span>
                                    <span>{deploy.deployedAt}</span>
                                    <span>•</span>
                                    <span>{deploy.author}</span>
                                </div>
                            </div>
                        </div>
                        <button className="opacity-0 group-hover:opacity-100 transition-opacity px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs rounded border border-slate-700 flex items-center gap-2">
                            <RotateCcw size={12} /> Rollback
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};