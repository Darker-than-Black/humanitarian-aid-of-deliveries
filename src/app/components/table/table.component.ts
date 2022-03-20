import { Component, Input, Output, EventEmitter } from '@angular/core';

import { TABLE_CONFIG } from '../../configs/tableConfig';
import { DeliverItem, TableColumnConfig } from '../../types';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent {
  @Input() data: DeliverItem[] = [];
  @Input() loading: boolean = false;
  @Output() openModal = new EventEmitter<void>();
  @Output() deleteItem = new EventEmitter<DeliverItem>();

  columns: TableColumnConfig[] = TABLE_CONFIG;

  get fieldsOfColumns(): string[] {
    return this.columns
      .filter(({ filterable }) => filterable)
      .map(({field}) => field);
  }
}
