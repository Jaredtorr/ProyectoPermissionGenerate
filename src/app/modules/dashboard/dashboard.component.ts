import { Component, OnInit, OnDestroy } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { HeaderComponent } from '../../components/header/header.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HeaderComponent, SidebarComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy {
  private routerSubscription?: Subscription;

  constructor(
    private titleService: TitleService,
    private router: Router
  ) { }

  ngOnInit() {
    this.updateTitle();

    this.routerSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateTitle();
    });
  }

  updateTitle() {
    const currentUrl = this.router.url;
    
    if (currentUrl.includes('generate-permission')) {
    } else if (currentUrl === '/dashboard' || currentUrl === '/dashboard/') {
      this.titleService.setTitle('Dashboard');
    }
  }

  ngOnDestroy() {
    this.routerSubscription?.unsubscribe();
  }
}