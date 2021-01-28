import { Component } from '@angular/core';
import { Estudiante } from '../models/estudiante';

import {EstudianteService} from '../services/estudiante.service';

import {Router, NavigationExtras} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {

  public students: Estudiante[];

  constructor(private service:EstudianteService, private router: Router) {
    this.service.getStudents().subscribe(data => {
      this.students = data.map(e => {
        return {
          id: e.payload.doc.id, 
          ...e.payload.doc.data()
        } as Estudiante;
      })
    });
  }

  update(student:Estudiante, active:Boolean){
    student.active = active;
    this.service.updateStudent(student, student.id);
  }

  detail(student: Estudiante){
    let navext: NavigationExtras = {
      queryParams:{
        special: JSON.stringify(student)
      }
    };
    this.router.navigate(['/detail'], navext);
  }

}
