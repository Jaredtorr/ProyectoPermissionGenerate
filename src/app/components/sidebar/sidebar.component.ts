import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  constructor (
    private router: Router
  ) {}

  sendToHome(event: Event) {
    event.preventDefault();
    this.router.navigate(['dashboard'])
  }

  sendToTutorados(event: Event) {
    event.preventDefault();
    this.router.navigate(['dashboard/tutorados']);
  }

  sendToEvidences(event: Event) {
    event.preventDefault();
    this.router.navigate(['']);
  }

  sendToPermissions(event: Event) {
    event.preventDefault();
    this.router.navigate(['dashboard/generate-permission']);
  }
}
