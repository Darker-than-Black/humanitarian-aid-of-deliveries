import { Component, OnInit } from '@angular/core';

import { EditorComponent } from '../../../types';
import { EditorMixin } from '../../../mixins/EditorMixin';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-quantity-editor',
  templateUrl: './quantity-editor.component.html',
  styleUrls: ['./quantity-editor.component.scss']
})
export class QuantityEditorComponent extends EditorMixin implements OnInit, EditorComponent {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  quantity: string = '';

  ngOnInit(): void {
    this.quantity = this.data.quantity || '';
  }

  save(): void {
    this.updateItem({...this.data, quantity: this.quantity});
  }
}
