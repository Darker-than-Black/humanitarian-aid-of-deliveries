import { Component, OnInit } from '@angular/core';

import { ApiService } from '../../../services/api.service';
import { EditorMixin } from '../../../mixins/EditorMixin';
import { EditorComponent } from '../../../types';
import { StoreService } from '../../../services/store.service';

@Component({
  selector: 'app-source-editor',
  templateUrl: './source-editor.component.html',
  styleUrls: ['./source-editor.component.scss']
})
export class SourceEditorComponent extends EditorMixin implements OnInit, EditorComponent {
  constructor(apiService: ApiService, public store: StoreService) {
    super(apiService);
  }

  source: string = '';

  ngOnInit(): void {
    this.source = this.data.source || '';
  }

  save(): void {
    this.updateItem({...this.data, source: this.source});
  }
}
