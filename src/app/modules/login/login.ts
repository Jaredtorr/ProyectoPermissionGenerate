import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) {}

  sendToRegister(event: Event) {
    event.preventDefault();
    this.router.navigate(['registro']);
  }

  onLogin(form: NgForm) {
    if (form.invalid) {
      this.errorMessage = 'Por favor completa los campos correctamente.';
      return;
    }
    this.errorMessage = '';
    console.log('Usuario:', this.username);
    console.log('Contraseña:', this.password);
  }
}
