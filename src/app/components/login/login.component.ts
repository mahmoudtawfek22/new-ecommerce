import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../product';
import { AuthService } from '../../services/auth.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Router, RouterLink } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, FontAwesomeModule, RouterLink],
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
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    console.log(this.user);
  }

  submit(user: User) {
    this.auth.auth(this.user).subscribe(
      (res: any) => {
        console.log(res);
        // localStorage.setItem('token', res.token);
        this.auth.setToken(res.token);

        this.router.navigate(['/shop', 'all']);
      },
      (err) => {
        this.valid = false;

        err.error.message = 'username or password is wrong';
        this.message = 'username or password is wrong';
        // let ele = document.getElementsByClassName('message')[0];

        // ele.classList.remove('hide');

        console.log(err.error.message);
      }
    );
  }
  hide() {
    // let ele = event.target as HTMLElement
    this.valid = true;
  }
}
