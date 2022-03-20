import { TableColumnConfig } from '../types';
import { formatDate } from '../utils';
import { EDITOR_TYPES } from './editorTypes';

export const TABLE_CONFIG: TableColumnConfig[] = [
  {
    header: '№',
    field: 'num_id',
    filterable: true,
  },
  {
    header: 'Назва',
    field: 'name',
    filterable: true,
  },
  {
    header: 'Дата поставки',
    field: 'supply_date',
    editType: EDITOR_TYPES.SUPPLY_DATE,
    handler: (date: string) => formatDate(date),
    filterable: true,
  },
  {
    header: 'Група',
    field: 'group_name',
    filterable: true,
  },
  {
    header: 'Одиниця виміру',
    field: 'dosage',
    filterable: true,
  },
  {
    header: 'Кількість',
    field: 'quantity',
    editType: EDITOR_TYPES.QUANTITY,
    filterable: true,
  },
  {
    header: 'Джерело поставки',
    field: 'source',
    editType: EDITOR_TYPES.SOURCE,
    filterable: true,
  },
  {
    header: 'Коментар',
    field: 'comment',
    editType: EDITOR_TYPES.COMMENT,
    filterable: true,
  },
  {
    header: '',
    field: 'delete',
  },
];
