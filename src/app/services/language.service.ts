import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { BehaviorSubject } from 'rxjs';
import { langReducer } from '../store/language/lang.reducer';
import { changeLang } from '../store/language/lang.action';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private translate: TranslateService,
    private store: Store<{ lang: string }>
  ) {}

  trans() {
    this.store.select('lang').subscribe((lang: string) => {
      if (lang == 'ar') {
        this.translate.use('ar');
        document.getElementsByTagName('body')[0].style.direction = 'rtl';
      } else {
        this.translate.use('en');
        document.getElementsByTagName('body')[0].style.direction = 'ltr';
      }
    });
  }
}
