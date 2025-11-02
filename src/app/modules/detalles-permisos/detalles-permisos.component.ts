import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TitleService } from '../../services/title/title.service';

interface Estudiante {
  nombre: string;
  email: string;
  telefono: string;
  matricula: string;
}

interface DetallePermiso {
  fechaInicio: string;
  fechaFinal: string;
  motivo: string;
  cuatrimestre: string;
  descripcion: string;
}

interface Tutor {
  nombre: string;
  email: string;
  telefono: string;
}

interface Docente {
  nombre: string;
  apellido: string;
  correo: string;
  estado: string;
}

@Component({
  selector: 'app-detalles-permisos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './detalles-permisos.component.html',
})
export class DetallesPermisosComponent implements OnInit {

  // Datos iniciales con docentes de ejemplo
  permiso = {
    fecha: '2025-11-01',
    estudiante: { 
      nombre: 'Juan Pérez', 
      email: 'juan.perez@ejemplo.com', 
      telefono: '961-123-4567', 
      matricula: '243850' 
    } as Estudiante,
    detallePermiso: { 
      fechaInicio: '2025-11-05', 
      fechaFinal: '2025-11-08', 
      motivo: 'Asuntos personales', 
      cuatrimestre: '5to', 
      descripcion: 'Solicito permiso por motivos personales urgentes' 
    } as DetallePermiso,
    tutor: { 
      nombre: 'María González', 
      email: 'maria.gonzalez@ejemplo.com', 
      telefono: '961-987-6543' 
    } as Tutor,
    docentes: [
      { nombre: 'Nombre', apellido: 'Apellido', correo: '243847@ids...', estado: 'aprobado' },
      { nombre: 'Nombre', apellido: 'Apellido', correo: '243869@ids...', estado: 'aprobado' },
      { nombre: 'Nombre', apellido: 'Apellido', correo: '243847@ids...', estado: 'aprobado' },
      { nombre: 'Nombre', apellido: 'Apellido', correo: '243868@ids...', estado: 'aprobado' }
    ] as Docente[]
  };

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Solicitud de permiso');
    this.titleService.setSearch(false);
  }

  // Métodos
  verEvidencia() { 
    console.log('Ver evidencia'); 
    // Aquí irá la lógica para ver la evidencia
  }
  
  rechazarPermiso() { 
    console.log('Permiso rechazado');
    // Aquí irá la lógica para rechazar el permiso
  }
  
  aceptarPermiso() { 
    console.log('Permiso aceptado');
    // Aquí irá la lógica para aceptar el permiso
  }
}