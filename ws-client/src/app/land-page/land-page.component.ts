import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";


@Component({
    selector: 'land-page',
    templateUrl: './land-page.component.html',
    styleUrls: ['./land-page.component.scss']
  })

  export class LandPageComponent implements OnInit{
    
    constructor(
        private router: Router
    ){
        
    }

    ngOnInit(): void {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
              //scroll to top
              window.scrollTo(0, 0);
            }
          });
    }
      
  }