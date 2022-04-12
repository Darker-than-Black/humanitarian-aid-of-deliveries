import { Injectable, isDevMode } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

import { MedTableService } from 'med-table';

import { SelectData } from './select-data';
import * as ROUTES from '../configs/apiRoutes';
import { StoreService } from './store.service';
import { NotificationService } from './notification.service';
import { NOTIFICATION_TYPES } from '../configs/notificationTypes';
import { notificationMessages } from '../configs/notificationMessages';
import { DeliveriesServerResponse, DeliverItem, DeliverItemForm, ServerResponse } from '../types';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private store: StoreService,
    private notification: NotificationService,
    private tableService: MedTableService,
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getDeliveries(): Observable<void> {
    const url = this.addDevMode(ROUTES.GET_DELIVERIES);
    return this.http.get<DeliveriesServerResponse>(url).pipe(
      map(({ data, list, sources }) => {
        this.tableService.setSelectData(SelectData.source(sources), 'source');
        this.store.setSourcesList(sources);
        this.store.setMedicineList(list);
        this.store.setDeliveries(data);
      }),
      catchError(this.handleError<void>(notificationMessages.serverError, 'getDeliveries')),
    );
  }

  updateDeliver(data: DeliverItem, key: string): Observable<DeliverItem | undefined> {
    const url = this.addDevMode(ROUTES.UPDATE_DELIVER);
    return this.http.post<ServerResponse<DeliverItem>>(url, data, this.httpOptions).pipe(
      map(({data}) => this.store.updateDeliver(data, key)),
      tap(() => this.notification.add(notificationMessages.fieldSuccess, NOTIFICATION_TYPES.SUCCESS)),
      catchError(this.handleError<any>(notificationMessages.updateError, 'updateDeliver', undefined)),
    );
  }

  addDeliver(data: DeliverItemForm): Observable<void> {
    const url = this.addDevMode(ROUTES.ADD_DELIVER);
    return this.http.post<ServerResponse<DeliverItem>>(url, data, this.httpOptions).pipe(
      map(({data}) => this.store.addDeliver(data)),
      tap(() => this.notification.add(notificationMessages.updateSuccess, NOTIFICATION_TYPES.SUCCESS)),
      catchError(this.handleError<any>(notificationMessages.updateError, 'addDeliver', undefined)),
    );
  }

  deleteDeliver(data: DeliverItem): Observable<void> {
    const url = this.addDevMode(ROUTES.DELETE_DELIVER);
    return this.http.post<ServerResponse<DeliverItem>>(url, data, this.httpOptions).pipe(
      map(({data}) => this.store.deleteDeliver(data)),
      tap(() => this.notification.add(notificationMessages.deleteSuccess, NOTIFICATION_TYPES.SUCCESS)),
      catchError(this.handleError<any>(notificationMessages.updateError, 'deleteDeliver', undefined)),
    );
  }

  private addDevMode(url: string): string {
    return isDevMode() ? `${url}&dev=1` : url;
  }

  private handleError<T>(message: string, operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      this.notification.add(message, NOTIFICATION_TYPES.ERROR);
      this.log(`${operation} failed: ${error.message}`, 'error');

      return of(result as T);
    };
  }

  private log(message: string, type = 'log'): void {
    (console as Record<string, any>)[type](`ApiService: ${message}`);
  }
}
