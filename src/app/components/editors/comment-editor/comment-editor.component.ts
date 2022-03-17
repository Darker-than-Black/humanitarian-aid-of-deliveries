import { Component, OnInit } from '@angular/core';

import { EditorComponent } from '../../../types';
import { EditorMixin } from '../../../mixins/EditorMixin';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-comment-editor',
  templateUrl: './comment-editor.component.html',
  styleUrls: ['./comment-editor.component.scss']
})
export class CommentEditorComponent extends EditorMixin implements OnInit, EditorComponent {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  comment: string = '';

  ngOnInit(): void {
    this.comment = this.data.comment || '';
  }

  save(): void {
    this.updateItem({...this.data, comment: this.comment});
  }
}
