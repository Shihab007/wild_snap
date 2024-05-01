import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
  })

export class Helper {
    private data:string;

    public setData(data:string){
        this.data = data;
    }
    public getData(){
        return this.data;
    }
}
