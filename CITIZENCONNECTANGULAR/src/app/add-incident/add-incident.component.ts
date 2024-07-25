import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../State';
import { IncidentsActions } from '../State/Actions/incidents.actions';
import { addIncident } from '../Models-Angular/Incidents';

@Component({
  selector: 'app-add-incident',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-incident.component.html',
  styleUrl: './add-incident.component.css'
})
export class AddIncidentComponent  implements OnInit{

  addIncidentForm!: FormGroup;

  constructor(private fb: FormBuilder ,private store: Store<AppState>){

  }
  ngOnInit(): void {
    this.addIncidentForm = this.fb.group({
      title: this.fb.control(null, Validators.required),
      description: this.fb.control(null, Validators.required),
      location: this.fb.control(null, Validators.required),
      multimediapath: this.fb.control(null, Validators.required),

    });

   
  }

  onSubmit(){
    console.log("Add Incident Form Submitted")
    console.log(this.addIncidentForm.value)


    let incident:addIncident={
      title: this.addIncidentForm.value.title,
      description: this.addIncidentForm.value.description,
      location: this.addIncidentForm.value.location,
      multimedia: "https://images.unsplash.com/photo-1626030952277-9fbe79141a31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5jaWRlbnR8ZW58MHx8MHx8fDA%3D",
  
    }



    this.store.dispatch(IncidentsActions.addIncident({newIncident:incident}))
    this.addIncidentForm.reset();

  }


}
