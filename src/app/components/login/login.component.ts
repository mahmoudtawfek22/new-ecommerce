import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../product';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    FontAwesomeModule,
    RouterLink,
    TranslateModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  user: any;
  valid = true;
  message!: string;
  constructor(private auth: AuthService, private router: Router) {
    this.user = {
      username: '',
      password: '',
      expiresInMins: 30,
    };
  }

  ngOnInit(): void {
    // console.log(this.user);
  }

  submit(user: User) {
    this.auth.auth(this.user).subscribe(
      (res: any) => {
        this.auth.setToken(res.accessToken);

        this.router.navigate(['/shop', 'all']);
      },
      (err) => {
        this.valid = false;

        this.message = 'username or password is wrong';

        // console.log(err.error.message);
      }
    );
  }
  hide() {
    this.valid = true;
  }
}
