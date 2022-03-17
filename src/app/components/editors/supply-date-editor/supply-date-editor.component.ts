import { Component, OnInit } from '@angular/core';

import { EditorComponent } from '../../../types';
import { EditorMixin } from '../../../mixins/EditorMixin';
import { ApiService } from '../../../services/api.service';

const DATE_RANGE = {
  min: '2000-01-01',
  max: '2030-01-01',
};

@Component({
  selector: 'app-supply-date-editor',
  templateUrl: './supply-date-editor.component.html',
  styleUrls: ['./supply-date-editor.component.scss']
})
export class SupplyDateEditorComponent extends EditorMixin implements OnInit, EditorComponent {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  readonly DATE_RANGE = DATE_RANGE;
  date: string = '';

  get isValidDate(): boolean {
    const minTime = this.getTime(DATE_RANGE.min);
    const maxTime = this.getTime(DATE_RANGE.max);
    const currentDate = this.getTime(this.date);

    return Boolean(this.date) && minTime <= currentDate && currentDate <= maxTime;
  }

  ngOnInit(): void {
    this.date = this.data.supply_date || '';
  }

  save(): void {
    if (!this.isValidDate) {
      return this.updateItem();
    }

    this.updateItem({ ...this.data, supply_date: this.date });
  }

  private getTime(date: string): number {
    return new Date(date).getTime();
  }
}
