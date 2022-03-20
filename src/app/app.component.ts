import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { DeliverItem, ListItem } from './types';
import { ApiService } from './services/api.service';
import { StoreService } from './services/store.service';
import { lastElOfArray, createNumIdOfListItem } from './utils';
import { NotificationService } from './services/notification.service';

const TAB_TYPES = {
  CHANGE: 'CHANGE',
  CREATE: 'CREATE',
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public notification: NotificationService,
    public store: StoreService,
    private apiService: ApiService,
    private fb: FormBuilder,
  ) {}

  deleteItem?: DeliverItem;
  tabTypes = TAB_TYPES;
  selectedTab: string = TAB_TYPES.CHANGE;
  loading: boolean = false;
  showDialog: boolean = false;

  medicineSelect: string = '';
  medicineForm = this.fb.group({
    group_name: ['', Validators.required],
    name: ['', Validators.required],
    dosage: ['', Validators.required],
  });
  deliverForm = this.fb.group({
    supply_date: ['', Validators.required],
    source: ['', Validators.required],
    quantity: ['', Validators.required],
    comment: [''],
  });

  get data(): DeliverItem[] {
    return this.store.deliveries;
  }

  get medicineOptions(): { label: string; id: string }[] {
    return this.store.medicineList.map(({name, num_id, group_name, dosage}) => ({
      id: num_id,
      label: `${num_id} / ${name} / ${group_name} / ${dosage}`,
    }));
  }

  get medicineFromData(): ListItem | undefined {
    if (this.tabTypes.CHANGE === this.selectedTab) {
      return this.store.medicineList.find(({num_id}) => num_id === this.medicineSelect);
    }

    const { num_id: id }: ListItem = lastElOfArray<ListItem>(this.store.medicineList);
    return {
      num_id: createNumIdOfListItem(id),
      ...this.medicineForm.value,
    };
  }

  get hasDisableBtn(): boolean {
    const medicineValid = this.tabTypes.CHANGE === this.selectedTab
      ? Boolean(this.medicineSelect) : this.medicineForm.valid;

    return !(this.deliverForm.valid && medicineValid) || this.loading;
  }

  ngOnInit() {
    this.loading = true;

    this.apiService.getDeliveries().subscribe(() => {
      this.loading = false;
    });
  }

  addDeliver(): void {
    const data = {...this.deliverForm.value, ...this.medicineFromData};

    this.loading = true;
    this.apiService.addDeliver(data).subscribe(() => {
      if (this.selectedTab === TAB_TYPES.CREATE) {
        this.store.addMedicineItem(this.medicineFromData as ListItem);
      }

      this.loading = false;
      this.showDialog = false;
      this.medicineForm.reset();
      this.deliverForm.reset();
      this.medicineSelect = '';
    });
  }

  onDeleteItem(event: DeliverItem): void {
    this.deleteItem = event;
    this.notification.addConfirmOfDeleteItem(`№${event.id} ${event.name}`);
  }

  onConfirmToDelete() {
    this.apiService.deleteDeliver(this.deleteItem as DeliverItem).subscribe(() => {
      this.deleteItem = undefined;
      this.notification.clearConfirmModal();
    });
  }
}
