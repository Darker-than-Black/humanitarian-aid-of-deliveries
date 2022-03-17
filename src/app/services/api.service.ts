import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';

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
  ) {}

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  getDeliveries(): Observable<void> {
    return this.http.get<DeliveriesServerResponse>(ROUTES.GET_DELIVERIES).pipe(
      map(({ data, list, sources }) => {
        this.store.setMedicineList(list);
        this.store.setSourcesList(sources);
        this.store.setDeliveries(data);
      }),
      catchError(this.handleError<void>(notificationMessages.serverError, 'getDeliveries')),
    );
  }

  updateDeliver(data?: DeliverItem): Observable<DeliverItem | undefined> {
    if (data === undefined) {
      this.notification.add(notificationMessages.fieldError, NOTIFICATION_TYPES.ERROR);
      return of(undefined);
    }

    return this.http.post<ServerResponse<DeliverItem>>(ROUTES.UPDATE_DELIVER, data, this.httpOptions).pipe(
      map(({data}) => {
        this.store.updateDeliver(data);
      }),
      tap(() => this.notification.add(notificationMessages.fieldSuccess, NOTIFICATION_TYPES.SUCCESS)),
      catchError(this.handleError<any>(notificationMessages.updateError, 'updateDeliver', undefined)),
    );
  }

  addDeliver(data: DeliverItemForm): Observable<DeliverItem> {
    return this.http.post<ServerResponse<DeliverItem>>(ROUTES.ADD_DELIVER, data, this.httpOptions).pipe(
      map(({data}) => {
        this.store.addDeliver(data)
      }),
      tap(() => this.notification.add(notificationMessages.updateSuccess, NOTIFICATION_TYPES.SUCCESS)),
      catchError(this.handleError<any>(notificationMessages.updateError, 'addDeliver', undefined)),
    );
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
