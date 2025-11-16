import { Component } from '@angular/core';
import { HeaderStudentComponent } from "../../components/header-student/header-student.component";

@Component({
  selector: 'app-history-student',
  standalone: true,
  imports: [HeaderStudentComponent],
  templateUrl: './history-student.component.html',
  styleUrl: './history-student.component.css'
})
export class HistoryStudentComponent {

}
