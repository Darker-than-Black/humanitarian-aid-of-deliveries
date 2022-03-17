import { EDITOR_TYPES } from './editorTypes';
import { SupplyDateEditorComponent } from '../components/editors/supply-date-editor/supply-date-editor.component';
import {QuantityEditorComponent} from '../components/editors/quantity-editor/quantity-editor.component';
import {CommentEditorComponent} from '../components/editors/comment-editor/comment-editor.component';
import {SourceEditorComponent} from '../components/editors/source-editor/source-editor.component';

export const editorsDictionary = new Map<string, any>()
  .set(EDITOR_TYPES.SUPPLY_DATE, SupplyDateEditorComponent)
  .set(EDITOR_TYPES.COMMENT, CommentEditorComponent)
  .set(EDITOR_TYPES.QUANTITY, QuantityEditorComponent)
  .set(EDITOR_TYPES.SOURCE, SourceEditorComponent);
