import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface Docente {
  id?: number;  // ID único para identificar el docente
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  correo: string;
  numero: string;
  cuatrimestre: string;
  materia: string;
}

@Component({
  selector: 'app-modal-aviso',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-aviso.component.html'
})
export class ModalAvisoComponent implements OnChanges {
  @Input() isVisible: boolean = false;
  @Input() docente: Docente = {
    nombre: '',
    apellidoP: '',
    apellidoM: '',
    correo: '',
    numero: '',
    cuatrimestre: '',
    materia: ''
  };
  @Output() cerrar = new EventEmitter<void>();
  @Output() guardar = new EventEmitter<Docente>();

  // Copia local del docente para editar
  docenteLocal: Docente = { ...this.docente };

  ngOnChanges(changes: SimpleChanges) {
    // Cuando cambia el docente de entrada, crear una copia para editar
    if (changes['docente'] && changes['docente'].currentValue) {
      this.docenteLocal = { ...this.docente };
    }
  }

  guardarDocente() {
    // Validación básica
    if (!this.docenteLocal.nombre || !this.docenteLocal.apellidoP || 
        !this.docenteLocal.apellidoM || !this.docenteLocal.correo) {
      alert('Por favor complete todos los campos obligatorios');
      return;
    }

    // Validación de correo
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(this.docenteLocal.correo)) {
      alert('Por favor ingrese un correo válido');
      return;
    }

    // Emitir la copia editada
    this.guardar.emit({ ...this.docenteLocal });
  }

  cerrarModal() {
    // Resetear la copia local al cerrar
    this.docenteLocal = { ...this.docente };
    this.cerrar.emit();
  }
}