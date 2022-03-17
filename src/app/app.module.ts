import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastModule } from 'primeng/toast';
import { TableModule } from 'primeng/table';
import { MessageService } from 'primeng/api';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ListboxModule } from 'primeng/listbox';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AppComponent } from './app.component';
import { TableComponent } from './components/table/table.component';
import { TableDataComponent } from './components/table-data/table-data.component';
import { SupplyDateEditorComponent } from './components/editors/supply-date-editor/supply-date-editor.component';
import { EditorTypeDirective } from './directives/editor-type.directive';
import { QuantityEditorComponent } from './components/editors/quantity-editor/quantity-editor.component';
import { CommentEditorComponent } from './components/editors/comment-editor/comment-editor.component';
import { SourceEditorComponent } from './components/editors/source-editor/source-editor.component';

@NgModule({
  declarations: [
    AppComponent,
    TableComponent,
    TableDataComponent,
    SupplyDateEditorComponent,
    EditorTypeDirective,
    QuantityEditorComponent,
    CommentEditorComponent,
    SourceEditorComponent,
  ],
  imports: [
    FormsModule,
    ToastModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ListboxModule,
    BrowserModule,
    DropdownModule,
    CalendarModule,
    InputTextModule,
    HttpClientModule,
    ReactiveFormsModule,
    InputTextareaModule,
    ProgressSpinnerModule,
    BrowserAnimationsModule,
  ],
  providers: [
    MessageService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
