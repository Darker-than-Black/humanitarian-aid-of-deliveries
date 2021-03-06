import { set, get } from 'lodash';
import { Injectable } from '@angular/core';
import { DeliverItem, ListItem } from '../types';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private data: {
    deliveries: DeliverItem[]
    sources: string[]
    medicineList: ListItem[]
  } = {
    deliveries: [],
    sources: [],
    medicineList: [],
  };

  get deliveries(): DeliverItem[] {
    return this.data.deliveries;
  }

  get sources(): string[] {
    return this.data.sources;
  }

  get medicineList(): ListItem[] {
    return this.data.medicineList;
  }

  setDeliveries(data: DeliverItem[]): void {
    this.data.deliveries = data;
  }

  updateDeliver(deliver: DeliverItem, key: string): void {
    this.data.deliveries.forEach(el => {
      if (el['id'] === deliver['id']) {
        set(el, key, get(deliver, key));
      }
    });
  }

  addDeliver(deliver: DeliverItem): void {
    this.data.deliveries.unshift(deliver);
  }

  deleteDeliver(deliver: DeliverItem): void {
    this.data.deliveries = this.data.deliveries.filter(({id}) => id !== deliver.id);
  }

  setSourcesList(data: string[]): void {
    this.data.sources = data;
  }

  setMedicineList(data: ListItem[]): void {
    this.data.medicineList = data;
  }

  addMedicineItem(item: ListItem): void {
    this.data.medicineList.push(item);
  }
}
