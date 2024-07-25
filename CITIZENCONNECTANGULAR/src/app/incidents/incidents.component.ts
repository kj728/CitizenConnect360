import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../State';
import { IView } from '../Models-Angular/Views';
import { IncidentsActions } from '../State/Actions/incidents.actions';
import { getAllIncidentsSelector } from '../State/Selectors/incident.selector';
import { IIncident } from '../Models-Angular/Incidents';

@Component({
  selector: 'app-incidents',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterLink],
  templateUrl: './incidents.component.html',
  styleUrl: './incidents.component.css'
})
export class IncidentsComponent implements OnInit{
  
 imagePath: string= 'https://images.unsplash.com/photo-1560956737-3428333ba83f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aW5jaWRlbnR8ZW58MHx8MHx8fDA%3D'

  constructor(private store:Store<AppState>){

  }
 

  allIncidents!:IIncident[]

  ngOnInit(): void {

    this.store.dispatch(IncidentsActions.get())
    this.store.select(getAllIncidentsSelector).subscribe(allIncidents => {
      this.allIncidents = allIncidents;

    })

  }


}
