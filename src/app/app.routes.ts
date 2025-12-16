import { Routes } from '@angular/router';

import { PetListComponent } from './components/pets/pet-list/pet-list.component';
import { PetFormComponent } from './components/pets/pet-form/pet-form.component';
import { PetDetailsComponent } from './components/pets/pet-details/pet-details.component';
import { RecordFormComponent } from './components/records/record-form/record-form.component';

export const routes: Routes = [
  { path: '', component: PetListComponent },
  { path: 'pets/new', component: PetFormComponent },
  { path: 'pets/:id', component: PetDetailsComponent },
  { path: 'pets/:id/edit', component: PetFormComponent },
  { path: 'pets/:petId/records/new', component: RecordFormComponent },
  { path: 'records/:recordId/edit', component: RecordFormComponent },

  // { path: 'records/:id/edit', component: RecordFormComponent },
  { path: '**', redirectTo: '' },
];
