// Field Types
export type FieldType = 
  | 'text' 
  | 'textarea' 
  | 'richtext' 
  | 'email' 
  | 'phone' 
  | 'password'
  | 'number' 
  | 'price'
  | 'image' 
  | 'gallery' 
  | 'select' 
  | 'tags' 
  | 'date' 
  | 'boolean';

// Field Configuration
export interface FieldConfig {
  id: string;
  name: string;
  key: string;
  type: FieldType;
  required: boolean;
  enabled: boolean;
  isSystem: boolean;
  linkedFeature?: string;
  group?: string;
}

// Feature Configuration
export interface FeatureConfig {
  key: string;
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  description?: string;
  linkedField?: string;
}

// Settings Field
export interface SettingField {
  key: string;
  label: string;
  type: 'number' | 'select' | 'toggle';
  options?: { value: string; label: string }[];
}

// Module Category
export type ModuleCategory = 'content' | 'commerce' | 'user' | 'system' | 'marketing';

// Module Configuration
export interface ModuleConfig {
  id: string;
  name: string;
  description: string;
  icon: React.ComponentType<{ size?: number }>;
  category: ModuleCategory;
  color: string;
  isCore?: boolean;
  fields: FieldConfig[];
  secondaryFields?: FieldConfig[];
  features?: FeatureConfig[];
  settings?: SettingField[];
  dependencies?: string[];
  conventionNote?: string;
}
