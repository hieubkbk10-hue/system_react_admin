import { FieldConfig } from '../types/moduleConfig';

// Default system fields (Rails convention)
export const SYSTEM_FIELDS: Partial<FieldConfig>[] = [
  { key: 'order', name: 'Thứ tự', type: 'number', required: true, isSystem: true },
  { key: 'active', name: 'Trạng thái', type: 'boolean', required: true, isSystem: true },
];

// Default pagination settings
export const DEFAULT_PER_PAGE = 20;

// Default status options
export const STATUS_OPTIONS = [
  { value: 'draft', label: 'Bản nháp' },
  { value: 'published', label: 'Xuất bản' },
  { value: 'archived', label: 'Lưu trữ' },
];

// Field type labels (Vietnamese)
export const FIELD_TYPE_LABELS: Record<string, string> = {
  text: 'Văn bản',
  textarea: 'Văn bản dài',
  richtext: 'Rich Text',
  email: 'Email',
  phone: 'Số điện thoại',
  password: 'Mật khẩu',
  number: 'Số',
  price: 'Giá tiền',
  image: 'Hình ảnh',
  gallery: 'Thư viện ảnh',
  select: 'Lựa chọn',
  tags: 'Tags',
  date: 'Ngày tháng',
  boolean: 'Bật/Tắt',
};
