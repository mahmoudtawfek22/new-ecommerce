import { createAction, props } from '@ngrx/store';

export const changeLang = createAction(
  'changeLang',
  props<{ lang: 'en' | 'ar' }>()
);
