import { Injectable } from "@angular/core";
import { Subject } from "rxjs";

@Injectable({
    providedIn: 'root'
  })
export class AsideService {

  toggledSubject = new Subject();
  toggled() {
    this.toggledSubject.next()
  }
}
