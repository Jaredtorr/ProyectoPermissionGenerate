import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PdfViewerModule } from 'ng2-pdf-viewer';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-permiso-generado',
  standalone: true,
  imports: [PdfViewerModule],
  templateUrl: './permiso-generado.component.html',
  styleUrls: ['./permiso-generado.component.css']
})
export class PermisoGeneradoComponent {
  pdfSrc: string | undefined;

  constructor(private router: Router) {}

  ngOnInit() {
    // Aquí generamos el PDF dinámico con algunos datos de ejemplo
    this.generarPDF({
      nombre: 'Juan Pérez',
      motivo: 'Trámite escolar',
      fecha: '28/10/2025'
    });
  }

  generarPDF(datos: { nombre: string; motivo: string; fecha: string }) {
    const docDefinition = {
      content: [
        { text: 'PERMISO GENERADO', style: 'header' },
        { text: `\nNombre: ${datos.nombre}` },
        { text: `Motivo: ${datos.motivo}` },
        { text: `Fecha: ${datos.fecha}` },
        { text: '\n\nFirma del solicitante: _____________________', margin: [0, 20, 0, 0] }
      ],
      styles: {
        header: { fontSize: 18, bold: true, alignment: 'center' }
      }
    };

    const pdfDocGenerator = pdfMake.createPdf(docDefinition);
    pdfDocGenerator.getBlob((blob: Blob) => {
      this.pdfSrc = URL.createObjectURL(blob);
    });
  }

  setTopermisoGenerado(event: Event) {
    event.preventDefault();
    this.router.navigate(['dashboard/permiso-generado']);
  }
}
