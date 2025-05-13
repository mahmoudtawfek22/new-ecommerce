import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  let token = authService.token;

  // authService.getToken().subscribe((res) => {
  //   token = res;
  // });
  if (!token) {
    return false;
  }
  return true;
};
