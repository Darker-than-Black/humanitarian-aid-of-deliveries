import { get } from 'lodash';
import { Component, Input, TemplateRef, ViewChild } from '@angular/core';

import { editorsDictionary } from '../../configs/editorsDictionary';
import { DeliverItem, EditorComponent, TableColumnConfig } from '../../types';
import { EditorTypeDirective } from '../../directives/editor-type.directive';

const DEFAULT_HANDLER = (data: any) => data;

@Component({
  selector: 'app-table-data',
  templateUrl: './table-data.component.html',
  styleUrls: ['./table-data.component.scss']
})
export class TableDataComponent {
  @Input() item!: DeliverItem;
  @Input() config!: TableColumnConfig;
  @Input() template?: TemplateRef<any>;

  showEditor: boolean = false;

  @ViewChild(EditorTypeDirective, {static: true}) editorDirective!: EditorTypeDirective;

  get fieldData(): string {
    return get(this.item, this.config.field, '');
  }

  get previewData(): string {
    const { handler = DEFAULT_HANDLER } = this.config;
    return this.fieldData ? handler(this.fieldData) : '–';
  }

  setEditorComponent(): void {
    const { editType = '' } = this.config;
    const component = editorsDictionary.get(editType);

    if (!component) {
      return;
    }

    this.editorDirective.viewContainerRef.clear();
    const componentRef = this.editorDirective.viewContainerRef.createComponent<EditorComponent>(component);
    this.showEditor = true;

    // set props
    componentRef.instance.data = this.item;
    // auto close modal
    componentRef.instance.finally.subscribe(() => {
      this.showEditor = false;
      this.editorDirective.viewContainerRef.clear();
    });
  }
}
