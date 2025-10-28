import { Component, OnInit} from '@angular/core';
import { TitleService } from '../../services/title/title.service';
import { ModalTutoradoComponent } from "../../components/modal-tutorado/modal-tutorado.component";

@Component({
  selector: 'app-tutorados',
  standalone: true,
  imports: [ModalTutoradoComponent],
  templateUrl: './tutorados.component.html',
  styleUrl: './tutorados.component.css'
})
export class TutoradosComponent  implements OnInit {

  constructor(private titleService: TitleService) { }
  ngOnInit(){
    this.titleService.setTitle('Tutorados');
  }
}
