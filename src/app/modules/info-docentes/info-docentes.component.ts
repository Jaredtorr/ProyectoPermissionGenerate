import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitleService } from '../../services/title/title.service';

interface Docente {
  nombre: string;
  email: string;
  telefono: string;
  rol: string;
  descripcion: string;
}

@Component({
  selector: 'app-info-docentes',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './info-docentes.component.html',
  styleUrls: ['./info-docentes.component.css']
})
export class InfoDocentesComponent {
  docentes: Docente[] = [
    {
      nombre: 'Diana Beatriz Vazquez Cruz',
      email: 'diana.vazquez@escuela.mx',
      telefono: '555-123-4567',
      rol: 'Coordinadora Académica',
      descripcion: 'Encargada de coordinar los programas académicos de la facultad.'
    },
    {
      nombre: 'Marcelo Alvarez Hernandez',
      email: 'marcelo.alvarez@escuela.mx',
      telefono: '555-987-6543',
      rol: 'Profesor de Matemáticas',
      descripcion: 'Docente con amplia experiencia en cálculo diferencial e integral.'
    },
    {
      nombre: 'Kevin Daniel Flores Nataren',
      email: 'kevin.flores@escuela.mx',
      telefono: '555-222-3344',
      rol: 'Profesor de Programación',
      descripcion: 'Imparte clases de desarrollo web y estructuras de datos.'
    },
    {
      nombre: 'Maria del Carmen Mijangos Cordova',
      email: 'maria.mijangos@escuela.mx',
      telefono: '555-888-7777',
      rol: 'Profesora de Inglés',
      descripcion: 'Docente enfocada en comunicación profesional y académica.'
    },
    {
      nombre: 'Montserrat Viridiana Ramos Lopez',
      email: 'montserrat.ramos@escuela.mx',
      telefono: '555-444-1122',
      rol: 'Tutora académica',
      descripcion: 'Apoya a los estudiantes con orientación académica personalizada.'
    },
    {
      nombre: 'Ulber Nolasco Sanchez',
      email: 'ulber.nolasco@escuela.mx',
      telefono: '555-666-7788',
      rol: 'Profesor de Bases de Datos',
      descripcion: 'Especialista en SQL y administración de sistemas de información.'
    }
  ];

  seleccionado: Docente | null = null;
  mostrarModal: boolean = false;
  copiaTemporal: Docente | null = null;

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Información de Docentes');
  }

  seleccionarDocente(docente: Docente) {
    this.seleccionado = docente;
  }

  abrirModal() {
    this.copiaTemporal = { ...this.seleccionado! };
    this.mostrarModal = true;
  }

  cerrarModal() {
    this.mostrarModal = false;
    this.copiaTemporal = null;
  }

  actualizarDocente() {
    if (this.seleccionado && this.copiaTemporal) {
      Object.assign(this.seleccionado, this.copiaTemporal);
      console.log('Datos actualizados:', this.seleccionado);
    }
    this.cerrarModal();
  }
}
