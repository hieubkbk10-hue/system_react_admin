import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Save, 
  Shield, 
  Settings, 
  ToggleLeft,
  Check,
  Info,
  Layers,
  Hash,
  FileText,
  Package,
  Users,
  ShoppingBag,
  Image,
  MessageSquare,
  Crown,
  Eye,
  Plus,
  Edit3,
  Trash2,
  Download,
  Upload,
  Lock,
  AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Permission {
  id: string;
  name: string;
  key: string;
  icon: any;
}

interface ModulePermission {
  moduleId: string;
  moduleName: string;
  moduleIcon: any;
  category: string;
  permissions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
    export: boolean;
    import: boolean;
  };
}

interface Role {
  id: string;
  name: string;
  description: string;
  color: string;
  isSystem: boolean;
  isSuperAdmin: boolean;
  usersCount: number;
}

const ToggleSwitch = ({ enabled, onChange, disabled = false }: { enabled: boolean; onChange: () => void; disabled?: boolean }) => (
  <button
    onClick={() => !disabled && onChange()}
    disabled={disabled}
    className={`relative w-10 h-5 rounded-full transition-colors ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
    } ${enabled ? 'bg-violet-500' : 'bg-slate-300 dark:bg-slate-700'}`}
  >
    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${
      enabled ? 'left-5' : 'left-0.5'
    }`} />
  </button>
);

const permissionIcons: Record<string, any> = {
  view: Eye,
  create: Plus,
  edit: Edit3,
  delete: Trash2,
  export: Download,
  import: Upload,
};

const permissionLabels: Record<string, string> = {
  view: 'Xem',
  create: 'Tạo',
  edit: 'Sửa',
  delete: 'Xóa',
  export: 'Xuất',
  import: 'Nhập',
};

export const RolesModuleConfig: React.FC = () => {
  const navigate = useNavigate();
  
  const [roles] = useState<Role[]>([
    { id: 'ROLE-1', name: 'Super Admin', description: 'Toàn quyền hệ thống', color: 'rose', isSystem: true, isSuperAdmin: true, usersCount: 1 },
    { id: 'ROLE-2', name: 'Administrator', description: 'Quản trị viên', color: 'cyan', isSystem: true, isSuperAdmin: false, usersCount: 2 },
    { id: 'ROLE-3', name: 'Biên tập viên', description: 'Quản lý nội dung', color: 'emerald', isSystem: false, isSuperAdmin: false, usersCount: 3 },
    { id: 'ROLE-4', name: 'Nhân viên bán hàng', description: 'Xử lý đơn hàng', color: 'amber', isSystem: false, isSuperAdmin: false, usersCount: 5 },
  ]);
  
  const [selectedRole, setSelectedRole] = useState<string>('ROLE-3');
  
  const [modulePermissions, setModulePermissions] = useState<ModulePermission[]>([
    // Content
    { moduleId: 'posts', moduleName: 'Bài viết', moduleIcon: FileText, category: 'content', permissions: { view: true, create: true, edit: true, delete: true, export: false, import: false } },
    { moduleId: 'media', moduleName: 'Thư viện Media', moduleIcon: Image, category: 'content', permissions: { view: true, create: true, edit: false, delete: false, export: false, import: false } },
    { moduleId: 'comments', moduleName: 'Bình luận', moduleIcon: MessageSquare, category: 'content', permissions: { view: true, create: false, edit: true, delete: true, export: false, import: false } },
    // Commerce
    { moduleId: 'products', moduleName: 'Sản phẩm', moduleIcon: Package, category: 'commerce', permissions: { view: true, create: false, edit: true, delete: false, export: true, import: false } },
    { moduleId: 'orders', moduleName: 'Đơn hàng', moduleIcon: ShoppingBag, category: 'commerce', permissions: { view: true, create: false, edit: true, delete: false, export: true, import: false } },
    // Users
    { moduleId: 'customers', moduleName: 'Khách hàng', moduleIcon: Users, category: 'user', permissions: { view: true, create: false, edit: false, delete: false, export: false, import: false } },
  ]);
  
  const [settings, setSettings] = useState({
    enableAuditLog: true,
    requireApproval: false,
    maxRolesPerUser: 3,
  });
  
  const handleTogglePermission = (moduleId: string, permission: string) => {
    setModulePermissions(prev => prev.map(mp => {
      if (mp.moduleId === moduleId) {
        return {
          ...mp,
          permissions: {
            ...mp.permissions,
            [permission]: !(mp.permissions as any)[permission]
          }
        };
      }
      return mp;
    }));
  };
  
  const handleToggleAllPermissions = (moduleId: string, enabled: boolean) => {
    setModulePermissions(prev => prev.map(mp => {
      if (mp.moduleId === moduleId) {
        return {
          ...mp,
          permissions: {
            view: enabled,
            create: enabled,
            edit: enabled,
            delete: enabled,
            export: enabled,
            import: enabled,
          }
        };
      }
      return mp;
    }));
  };
  
  const currentRole = roles.find(r => r.id === selectedRole);
  const groupedModules = modulePermissions.reduce((acc, mp) => {
    if (!acc[mp.category]) acc[mp.category] = [];
    acc[mp.category].push(mp);
    return acc;
  }, {} as Record<string, ModulePermission[]>);
  
  const categoryLabels: Record<string, { label: string; color: string }> = {
    content: { label: 'Nội dung', color: 'text-blue-500' },
    commerce: { label: 'Thương mại', color: 'text-emerald-500' },
    user: { label: 'Người dùng', color: 'text-purple-500' },
  };
  
  const colorMap: Record<string, string> = {
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
    cyan: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border-cyan-500/20',
    emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  };
  
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
            <div className="w-12 h-12 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
              <Shield size={24} />
            </div>
            <div>
              <h1 className="text-xl font-bold text-slate-800 dark:text-slate-100">Module Vai trò & Quyền</h1>
              <p className="text-sm text-slate-500">Phân quyền RBAC cho hệ thống</p>
            </div>
          </div>
        </div>
        
        <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors">
          <Save size={16} /> Lưu thay đổi
        </button>
      </div>
      
      {/* Module Status */}
      <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-500 flex items-center justify-center">
            <Check size={16} />
          </div>
          <span className="text-sm font-medium text-emerald-700 dark:text-emerald-400">Module Core - Luôn hoạt động</span>
        </div>
        <Lock size={16} className="text-slate-400" />
      </div>
      
      {/* Super Admin Warning */}
      <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-4 flex items-start gap-3">
        <AlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={18} />
        <div>
          <h4 className="text-sm font-medium text-amber-600 dark:text-amber-400">Nguyên tắc Least Privilege</h4>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80 mt-1">
            Chỉ cấp quyền tối thiểu cần thiết cho mỗi vai trò. Review quyền định kỳ và thu hồi quyền không sử dụng.
          </p>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        
        {/* Column 1: Roles List & Settings */}
        <div className="space-y-4">
          {/* Roles List */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
                <Crown size={14} className="text-violet-500" /> Vai trò
              </h3>
              <button className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1">
                <Plus size={12} /> Thêm
              </button>
            </div>
            
            <div className="space-y-2">
              {roles.map((role) => (
                <button
                  key={role.id}
                  onClick={() => !role.isSuperAdmin && setSelectedRole(role.id)}
                  disabled={role.isSuperAdmin}
                  className={`w-full text-left p-3 rounded-lg border transition-all ${
                    selectedRole === role.id 
                      ? 'bg-violet-50 dark:bg-violet-950/30 border-violet-300 dark:border-violet-700' 
                      : 'bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  } ${role.isSuperAdmin ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center border ${colorMap[role.color]}`}>
                        {role.isSuperAdmin ? <Crown size={12} /> : <Shield size={12} />}
                      </div>
                      <div>
                        <span className="text-sm font-medium text-slate-700 dark:text-slate-200 block">{role.name}</span>
                        <span className="text-[10px] text-slate-400">{role.usersCount} users</span>
                      </div>
                    </div>
                    {role.isSuperAdmin && (
                      <Lock size={12} className="text-slate-400" />
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Settings */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-3 flex items-center gap-2">
              <Settings size={14} className="text-slate-500" /> Cài đặt
            </h3>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <div>
                  <span className="text-xs text-slate-700 dark:text-slate-200 block">Audit Log</span>
                  <span className="text-[10px] text-slate-400">Ghi lại thay đổi quyền</span>
                </div>
                <ToggleSwitch 
                  enabled={settings.enableAuditLog} 
                  onChange={() => setSettings({...settings, enableAuditLog: !settings.enableAuditLog})}
                />
              </div>
              
              <div className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-950">
                <div>
                  <span className="text-xs text-slate-700 dark:text-slate-200 block">Yêu cầu phê duyệt</span>
                  <span className="text-[10px] text-slate-400">Khi thay đổi quyền</span>
                </div>
                <ToggleSwitch 
                  enabled={settings.requireApproval} 
                  onChange={() => setSettings({...settings, requireApproval: !settings.requireApproval})}
                />
              </div>
              
              <div>
                <label className="text-xs text-slate-500 mb-1 block">Max roles / user</label>
                <input 
                  type="number" 
                  value={settings.maxRolesPerUser}
                  onChange={(e) => setSettings({...settings, maxRolesPerUser: parseInt(e.target.value)})}
                  className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-sm outline-none focus:border-violet-500"
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* Column 2-4: Permission Matrix */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Shield size={14} className="text-violet-500" /> 
              Ma trận quyền: <span className="text-violet-600 dark:text-violet-400">{currentRole?.name}</span>
            </h3>
            
            <div className="flex items-center gap-2">
              {Object.entries(permissionLabels).map(([key, label]) => (
                <div key={key} className="flex items-center gap-1 text-[10px] text-slate-500">
                  {React.createElement(permissionIcons[key], { size: 10 })}
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-6">
            {Object.entries(groupedModules).map(([category, modules]) => (
              <div key={category}>
                <h4 className={`text-xs font-semibold mb-3 ${categoryLabels[category].color}`}>
                  {categoryLabels[category].label}
                </h4>
                
                <div className="space-y-2">
                  {modules.map((mp) => {
                    const Icon = mp.moduleIcon;
                    const allEnabled = Object.values(mp.permissions).every(v => v);
                    const someEnabled = Object.values(mp.permissions).some(v => v);
                    
                    return (
                      <div key={mp.moduleId} className="flex items-center gap-4 p-3 rounded-lg bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                        {/* Module Info */}
                        <div className="flex items-center gap-2 w-40">
                          <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center">
                            <Icon size={16} />
                          </div>
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-200">{mp.moduleName}</span>
                        </div>
                        
                        {/* Permission Toggles */}
                        <div className="flex items-center gap-3 flex-1">
                          {Object.entries(mp.permissions).map(([perm, enabled]) => {
                            const PermIcon = permissionIcons[perm];
                            return (
                              <button
                                key={perm}
                                onClick={() => handleTogglePermission(mp.moduleId, perm)}
                                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
                                  enabled 
                                    ? 'bg-violet-500/10 border-violet-500/30 text-violet-600 dark:text-violet-400' 
                                    : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
                                }`}
                              >
                                <PermIcon size={12} />
                                <span className="text-[10px] font-medium">{permissionLabels[perm]}</span>
                              </button>
                            );
                          })}
                        </div>
                        
                        {/* Toggle All */}
                        <button
                          onClick={() => handleToggleAllPermissions(mp.moduleId, !allEnabled)}
                          className={`text-[10px] px-2 py-1 rounded border transition-all ${
                            allEnabled 
                              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400' 
                              : someEnabled
                                ? 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400'
                                : 'bg-slate-100 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-400'
                          }`}
                        >
                          {allEnabled ? 'Tất cả' : someEnabled ? 'Một phần' : 'Không'}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* RBAC Best Practices */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-lg bg-purple-50 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-800/50">
          <h4 className="text-sm font-semibold text-purple-700 dark:text-purple-400 mb-2">1. Define Clear Roles</h4>
          <p className="text-xs text-purple-600/80 dark:text-purple-400/80">
            Tạo vai trò dựa trên chức năng công việc, không phải chức danh. Mỗi vai trò có nhiệm vụ rõ ràng.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-cyan-50 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-800/50">
          <h4 className="text-sm font-semibold text-cyan-700 dark:text-cyan-400 mb-2">2. Map Permissions</h4>
          <p className="text-xs text-cyan-600/80 dark:text-cyan-400/80">
            Quyền phải gắn trực tiếp với nhiệm vụ của vai trò. Không cấp quyền thừa hoặc không liên quan.
          </p>
        </div>
        
        <div className="p-4 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50">
          <h4 className="text-sm font-semibold text-amber-700 dark:text-amber-400 mb-2">3. Regular Reviews</h4>
          <p className="text-xs text-amber-600/80 dark:text-amber-400/80">
            Kiểm tra quyền định kỳ (hàng quý). Thu hồi quyền của nhân viên đã nghỉ việc hoặc chuyển bộ phận.
          </p>
        </div>
      </div>
      
      {/* Convention Note */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-3 flex items-start gap-2">
        <Info size={14} className="text-blue-500 shrink-0 mt-0.5" />
        <p className="text-xs text-blue-600 dark:text-blue-400">
          <strong>Best Practice:</strong> Super Admin không thể chỉnh sửa quyền (full access). 
          Sử dụng <code className="bg-blue-500/20 px-1 rounded">audit_log</code> để theo dõi mọi thay đổi.
          Áp dụng nguyên tắc <code className="bg-blue-500/20 px-1 rounded">Separation of Duties</code> cho các hành động nhạy cảm.
        </p>
      </div>
    </div>
  );
};

export default RolesModuleConfig;
