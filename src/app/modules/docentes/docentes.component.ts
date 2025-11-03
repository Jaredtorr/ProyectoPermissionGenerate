import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalDocenteComponent } from '../../components/modal-docente/modal-docente.component';
import { ModalAlertComponent } from '../../components/modal-alert/modal-alert.component';
import { ModalAvisoComponent } from '../../components/modal-aviso/modal-aviso.component';
import { TitleService } from '../../services/title/title.service';

interface Docente {
  id?: number;  // Agregamos ID único
  nombre: string;
  apellidoP: string;
  apellidoM: string;
  correo: string;
  numero: string;
  cuatrimestre: string;
  materia: string;
}

@Component({
  selector: 'app-docentes',
  standalone: true,
  imports: [CommonModule, ModalDocenteComponent, ModalAlertComponent, ModalAvisoComponent],
  templateUrl: './docentes.component.html',
})
export class DocentesComponent implements OnInit {
  isModalVisible = false;
  isAlertVisible = false;
  isEditModalVisible = false;
  docenteSeleccionado: Docente | null = null;
  docenteParaEditar: Docente | null = null;
  private nextId = 4;  // Contador para IDs únicos

  docentes: Docente[] = [
    { id: 1, nombre: 'Ali', apellidoP: 'Lopez', apellidoM: 'Zunun', correo: 'ali.lopez@upchiapas.edu.mx', numero: '9661155544', cuatrimestre: '5', materia: 'Programación' },
    { id: 2, nombre: 'Eduardo', apellidoP: 'Toledo', apellidoM: 'Perez', correo: 'eduardo.toledo@upchiapas.edu.mx', numero: '9661155549', cuatrimestre: '3', materia: 'Base de Datos' },
    { id: 3, nombre: 'Daniel', apellidoP: 'Chanona', apellidoM: 'Castro', correo: 'daniel.chanona@upchiapas.edu.mx', numero: '9661155355', cuatrimestre: '7', materia: 'Redes' },
  ];

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.titleService.setTitle('Docentes');
    this.titleService.setSearch(false);
  }

  // ===== AGREGAR DOCENTE =====
  abrirModal() {
    this.isModalVisible = true;
  }

  cerrarModal() {
    this.isModalVisible = false;
  }

  guardarDocente(docente: Docente) {
    // Asignar ID al nuevo docente
    const nuevoDocente = {
      ...docente,
      id: this.nextId++
    };
    this.docentes.push(nuevoDocente);
    this.cerrarModal();
    console.log('Docente agregado:', nuevoDocente);
  }

  // ===== EDITAR DOCENTE =====
  abrirEditModal(docente: Docente) {
    // Clonar el docente para editar sin afectar el original
    this.docenteParaEditar = { ...docente };
    this.isEditModalVisible = true;
    console.log('Editando docente con ID:', docente.id);
  }

  cerrarEditModal() {
    this.isEditModalVisible = false;
    this.docenteParaEditar = null;
  }

  actualizarDocente(docenteActualizado: Docente) {
    // Buscar por ID en lugar de por referencia
    const index = this.docentes.findIndex(d => d.id === docenteActualizado.id);
    
    if (index !== -1) {
      // Actualizar el docente manteniendo el ID
      this.docentes[index] = {
        ...docenteActualizado,
        id: this.docentes[index].id  // Asegurar que el ID no cambie
      };
      console.log('Docente actualizado:', this.docentes[index]);
    } else {
      console.error('No se encontró el docente a actualizar');
    }
    
    this.cerrarEditModal();
  }

  // ===== ELIMINAR DOCENTE =====
  confirmarEliminacion(docente: Docente) {
    this.docenteSeleccionado = docente;
    this.isAlertVisible = true;
  }

  cerrarAlerta() {
    this.isAlertVisible = false;
    this.docenteSeleccionado = null;
  }

  eliminarDocenteConfirmado() {
    if (this.docenteSeleccionado) {
      // Filtrar por ID
      this.docentes = this.docentes.filter(d => d.id !== this.docenteSeleccionado!.id);
      console.log('Docente eliminado con ID:', this.docenteSeleccionado.id);
      this.docenteSeleccionado = null;
    }
    this.cerrarAlerta();
  }

  // Función trackBy para optimizar el renderizado
  trackByDocente(index: number, docente: Docente): number {
    return docente.id || index;
  }
}