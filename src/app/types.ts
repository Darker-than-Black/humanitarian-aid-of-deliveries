import { EventEmitter } from '@angular/core';
import { EDITOR_TYPES } from './configs/editorTypes';

export interface TableColumnConfig {
  field: string
  header: string
  filterable?: boolean
  editType?: EDITOR_TYPES
  handler?: (data: any) => any
}

export interface ServerResponse<T> {
  success: boolean
  data: T
}

export interface DeliverItem {
  id: string
  name: string
  comment?: string
  dosage?: string
  group_name?: string
  num_id?: string
  quantity?: string
  source?: string
  supply_date?: string
  user_id?: string
}

export interface DeliverItemForm {
  name: string
  comment: string
  dosage: string
  group_name: string
  num_id: string
  quantity: string
  source: string
  supply_date: string
}

export interface ListItem {
  name: string
  dosage: string
  group_name: string
  num_id: string
}

export interface DeliveriesServerResponse {
  success: boolean
  data: DeliverItem[]
  list: ListItem[]
  sources: string[]
}

export interface EditorComponent {
  data: DeliverItem;
  finally: EventEmitter<void>;
}

