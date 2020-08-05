import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  public widthWindow: BehaviorSubject<number> = new BehaviorSubject(1000);
  public visibility: boolean = true;
  public chatSelect: boolean = false;

  constructor() {
  }

}
