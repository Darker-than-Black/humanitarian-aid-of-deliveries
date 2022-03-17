import { TableColumnConfig } from '../types';
import { formatDate } from '../utils';
import { EDITOR_TYPES } from './editorTypes';

export const TABLE_CONFIG: TableColumnConfig[] = [
  {
    header: '№',
    field: 'num_id',
  },
  {
    header: 'Назва',
    field: 'name',
  },
  {
    header: 'Дата поставки',
    field: 'supply_date',
    editType: EDITOR_TYPES.SUPPLY_DATE,
    handler: (date: string) => formatDate(date),
  },
  {
    header: 'Група',
    field: 'group_name',
  },
  {
    header: 'Одиниця виміру',
    field: 'dosage',
  },
  {
    header: 'Кількість',
    field: 'quantity',
    editType: EDITOR_TYPES.QUANTITY,
  },
  {
    header: 'Джерело поставки',
    field: 'source',
    editType: EDITOR_TYPES.SOURCE,
  },
  {
    header: 'Коментар',
    field: 'comment',
    editType: EDITOR_TYPES.COMMENT,
  },
];
