import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ApiService } from './services/api.service';
import { DeliverItem } from './types';
import { StoreService } from './services/store.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    public store: StoreService,
    private apiService: ApiService,
    private fb: FormBuilder,
  ) {}

  loading: boolean = false;
  showDialog: boolean = false;
  newDeliverForm = this.fb.group({
    supply_date: ['', Validators.required],
    source: ['', Validators.required],
    quantity: ['', Validators.required],
    medicine: ['', Validators.required],
    comment: [''],
  });

  get data(): DeliverItem[] {
    return this.store.deliveries;
  }

  get medicineList(): { label: string; id: string }[] {
    return this.store.medicineList.map(({name, num_id, group_name, dosage}) => ({
      id: num_id,
      label: `${num_id} / ${name} / ${group_name} / ${dosage}`,
    }));
  }

  ngOnInit() {
    this.loading = true;

    this.apiService.getDeliveries().subscribe(() => {
      this.loading = false;
    });
  }

  addDeliver(): void {
    const {value} = this.newDeliverForm;
    const medicineItem = this.store.medicineList.find(({num_id}) => num_id === value.medicine);

    this.loading = true;
    this.apiService.addDeliver({...value, ...medicineItem}).subscribe(() => {
      this.loading = false;
      this.showDialog = false;
    });
  }
}
