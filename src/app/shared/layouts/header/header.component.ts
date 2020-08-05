import {Component, OnInit} from '@angular/core';
import {AppService} from '@core/services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public appS: AppService) {
  }

  ngOnInit(): void {
  }

}
