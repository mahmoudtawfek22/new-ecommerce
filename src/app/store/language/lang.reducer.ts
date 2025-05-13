import { createReducer, on } from '@ngrx/store';
import { changeLang } from './lang.action';

const inatialState = 'en';

export const langReducer = createReducer(
  inatialState,
  on(changeLang, (state, action) => action.lang)
);
