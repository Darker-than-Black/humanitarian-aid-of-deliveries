import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

import { ApiService } from '../services/api.service';
import { EditorComponent, DeliverItem } from '../types';

@Component({
  template: '',
})
export class EditorMixin implements EditorComponent {
  constructor(protected apiService: ApiService) {}

  @Input() data!: DeliverItem;
  @Output() finally = new EventEmitter<void>();
  @ViewChild('input') inputEl!: ElementRef;

  loading: boolean = false;

  updateItem(data?: DeliverItem): void {
    this.loading = true;

    this.apiService.updateDeliver(data).subscribe(() => {
      this.loading = false;
      this.finally.emit();
    });
  }

  ngAfterViewInit(): void {
    this.inputEl.nativeElement.focus();
  }
}
