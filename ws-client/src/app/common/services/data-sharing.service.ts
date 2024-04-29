import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DataSharingService {
  private sharedData: any; // You can replace 'any' with a more specific type

  setData(data: any) {
    this.sharedData = data;
  }

  getData() {
    return this.sharedData;
  }
}
