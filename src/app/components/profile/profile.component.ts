import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent {
  userData: any;
  token: string = this.auth.token;

  constructor(
    private auth: AuthService,
    private cookie: CookieService,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.auth.getToken().subscribe((res) => {
      this.token = res;
    });

    this.auth.userdetails(this.token).subscribe((res) => {
      this.userData = res;
    });
    // this.userData = {
    //   id: 7,
    //   firstName: 'Alexander',
    //   lastName: 'Jones',
    //   maidenName: '',
    //   age: 38,
    //   gender: 'male',
    //   email: 'alexander.jones@x.dummyjson.com',
    //   phone: '+61 260-824-4986',
    //   username: 'alexanderj',
    //   password: 'alexanderjpass',
    //   birthDate: '1986-10-20',
    //   image: 'https://dummyjson.com/icon/alexanderj/128',
    //   bloodGroup: 'AB-',
    //   height: 153.89,
    //   weight: 77.42,
    //   eyeColor: 'Blue',
    //   hair: {
    //     color: 'White',
    //     type: 'Straight',
    //   },
    //   ip: '166.204.84.32',
    //   address: {
    //     address: '664 Maple Street',
    //     city: 'Indianapolis',
    //     state: 'Delaware',
    //     stateCode: 'DE',
    //     postalCode: '86684',
    //     coordinates: {
    //       lat: 35.289664,
    //       lng: 7.063255,
    //     },
    //     country: 'United States',
    //   },
    //   macAddress: 'd2:64:58:2d:1c:46',
    //   university: 'University of Illinois--Urbana-Champaign',
    //   bank: {
    //     cardExpire: '05/25',
    //     cardNumber: '7344951706130140',
    //     cardType: 'JCB',
    //     currency: 'EUR',
    //     iban: '49V4GVDVMP0MHIDD4VXMQ3A2',
    //   },
    //   company: {
    //     department: 'Engineering',
    //     name: 'Dickens - Beahan',
    //     title: 'Web Developer',
    //     address: {
    //       address: '996 Eighth Street',
    //       city: 'Washington',
    //       state: 'Kansas',
    //       stateCode: 'KS',
    //       postalCode: '27858',
    //       coordinates: {
    //         lat: -75.462366,
    //         lng: -128.025697,
    //       },
    //       country: 'United States',
    //     },
    //   },
    //   ein: '638-127',
    //   ssn: '722-993-925',
    //   userAgent:
    //     'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36',
    //   crypto: {
    //     coin: 'Bitcoin',
    //     wallet: '0xb9fc2fe63b2a6c003f1c324c3bfa53259162181a',
    //     network: 'Ethereum (ERC20)',
    //   },
    //   role: 'moderator',
    // };
  }
}
