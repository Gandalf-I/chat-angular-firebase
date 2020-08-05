import {Component, OnInit} from '@angular/core';
import {AuthService} from '@core/services/auth.service';

@Component({
  selector: 'app-first-split',
  templateUrl: './first-split.component.html',
  styleUrls: ['./first-split.component.scss']
})
export class FirstSplitComponent implements OnInit {

  constructor(private auth: AuthService) {
  }

  ngOnInit(): void {
  }

  signOut(): void {
    if (confirm('Are you sure you want to get out?')) {
      this.auth.signOut();
    }
  }
}
