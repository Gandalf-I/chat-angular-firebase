import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
// import { LoaderService } from '@core/services/loader.service';

@Component({
  selector: 'app-loader-btn',
  templateUrl: './loader-btn.component.html',
  styleUrls: ['./loader-btn.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoaderBtnComponent {

  public loaderState$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  @Input()
  public value: string;

  @Input()
  public color: 'primary' = 'primary';

  @Input()
  public type: 'text' | 'submit' = 'text';

  @Input()
  public set loading(state: boolean) {
    this.loaderState$.next(state);
  }

  constructor(/*public loaderService: LoaderService*/) {}

  // public hideLoader(): void {
  //   this.loaderService.autoLoading = true;
  //   this.loaderState$.next(false);
  // }
  //
  // public showLoader(): void {
  //   this.loaderService.autoLoading = false;
  //   this.loaderState$.next(true);
  // }
}
