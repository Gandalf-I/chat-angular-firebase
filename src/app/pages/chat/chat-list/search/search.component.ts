import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {ChatService} from '@core/services/chat.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  public search: FormGroup;

  constructor(private chatS: ChatService) {
    this.search = new FormGroup({
      text: new FormControl(),
    });
  }

  ngOnInit(): void {
  }

  searchChat(): void {
    this.chatS.searchChat(this.search.value.text);
  }

  clearSearch(): void {
    this.search.reset('');
    this.chatS.searchChat('');
  }
}
