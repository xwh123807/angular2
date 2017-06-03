import { AuthService } from '../security/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message: string;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.setMessage();
  }

  ngOnInit() {
  }

  setMessage() {
    this.message = 'Logged' + (this.authService.isLoggedIn ? 'in' : 'out');
  }

  login() {
    this.message = 'Trying to log in ...';
    this.authService.login().subscribe(() => {
      this.setMessage();
      if (this.authService.isLoggedIn) {
        const redirect = this.authService.redirectUrl ? this.authService.redirectUrl : '/admin';
        const navigationExtra: NavigationExtras = {
          preserveQueryParams: true,
          preserveFragment: true
        }
        this.router.navigate([redirect], navigationExtra);
      }
    });
  }

  logout() {
    this.authService.logout();
    this.setMessage();
  }
}
