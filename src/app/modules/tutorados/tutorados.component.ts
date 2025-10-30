import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TitleService } from '../../services/title/title.service';
import { ModalTutoradoComponent } from '../../components/modal-tutorado/modal-tutorado.component';

interface Alumno {
  matricula: string;
  nombre: string;
  segundoNombre?: string;  // ← Campo opcional
  apellidoP: string;
  apellidoM: string;
  correo: string;
  telefono: string;
  tutor: string;
}

@Component({
  selector: 'app-tutorados',
  standalone: true,
  imports: [CommonModule, ModalTutoradoComponent],
  templateUrl: './tutorados.component.html',
  styleUrls: ['./tutorados.component.css']
})
export class TutoradosComponent implements OnInit {
  alumnos: Alumno[] = [
    {
      matricula: '12345',
      nombre: 'Luis',
      segundoNombre: 'Fernando',
      apellidoP: 'García',
      apellidoM: 'Lopez',
      correo: 'luisf@gmail.com',
      telefono: '555-123-4567',
      tutor: 'Juan Pérez'
    },
    {
      matricula: '233335',
      nombre: 'Ali',
      segundoNombre: 'Lopez',
      apellidoP: 'Lopez',
      apellidoM: 'Zunun',
      correo: '233335@lds.upchiapas.edu.mx',
      telefono: '9661155544',
      tutor: '966449933'
    },
    {
      matricula: '233336',
      nombre: 'Eduardo',
      segundoNombre: 'Andrés',
      apellidoP: 'Toledo',
      apellidoM: 'Perez',
      correo: '233333@lds.upchiapas.edu.mx',
      telefono: '9661155549',
      tutor: '966449939'
    },
    {
      matricula: '233337',
      nombre: 'Daniel',
      segundoNombre: 'Morales',
      apellidoP: 'Chanona',
      apellidoM: 'Castro',
      correo: '233355@lds.upchiapas.edu.mx',
      telefono: '9661155355',
      tutor: '966444533'
    }
  ];
  
  isModalVisible = false;

  abrirModal() {
    this.isModalVisible = true;
  }

  cerrarModal() {
    this.isModalVisible = false;
  }

  guardarAlumno(nuevoAlumno: Alumno) {
    this.alumnos.push(nuevoAlumno);
    this.cerrarModal();
  }

  constructor(private titleService: TitleService) { }
  
  ngOnInit() {
    this.titleService.setTitle('Tutorados');
  }
}
