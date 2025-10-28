import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title/title.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  nameInterface: string = '';

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    this.titleService.title$.subscribe(title => {
      this.nameInterface = title;
    });
  }
}