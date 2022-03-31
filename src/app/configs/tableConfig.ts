import { FIELD_TYPES, MedTableColumnConfig } from 'med-table';
import { formatDate } from '../utils';

export const TABLE_CONFIG: MedTableColumnConfig[] = [
  {
    label: '№',
    key: 'num_id',
    filterable: true,
  },
  {
    label: 'Назва',
    key: 'name',
    filterable: true,
  },
  {
    label: 'Дата поставки',
    key: 'supply_date',
    editorType: FIELD_TYPES.DATE,
    viewHandler: (date: string) => formatDate(date),
    filterable: true,
  },
  {
    label: 'Група',
    key: 'group_name',
    filterable: true,
  },
  {
    label: 'Одиниця виміру',
    key: 'dosage',
    filterable: true,
  },
  {
    label: 'Кількість',
    key: 'quantity',
    editorType: FIELD_TYPES.NUMBER,
    filterable: true,
  },
  {
    label: 'Джерело поставки',
    key: 'source',
    editorType: FIELD_TYPES.SELECT,
    filterable: true,
  },
  {
    label: 'Коментар',
    key: 'comment',
    editorType: FIELD_TYPES.TEXTAREA,
    filterable: true,
  },
  {
    label: '',
    key: 'delete',
    defaultValue: '',
    hideExport: true,
  },
];
