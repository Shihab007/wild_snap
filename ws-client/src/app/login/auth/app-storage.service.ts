import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class AppStorageService {
  constructor() {}

  getData(key) {
    return localStorage.getItem(key);
  }

  setData(key, value) {
    localStorage.setItem(key, value);
  }

  removeData(key: string) {
    localStorage.removeItem(key);
  }
  clear() {
    localStorage.clear();
  }
}
