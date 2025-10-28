import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  nameInterface: string = '';
  showSearch: boolean = false;

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    // Escuchar el título
    this.titleService.title$.subscribe(title => {
      this.nameInterface = title;
    });

    // Escuchar si se debe mostrar el buscador
    this.titleService.search$.subscribe(show => {
      this.showSearch = show;
    });
  }
}
