import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../pet.model';
import { MedicalRecord } from '../../records/record.model';
import { RecordItemComponent } from '../../records/record-item/record-item.component';
import { ActivatedRoute, Router } from '@angular/router';

import { PetService } from '../../../services/pet.service';
import { RecordService } from '../../../services/record.service';

@Component({
  selector: 'app-pet-details',
  templateUrl: './pet-details.component.html',
  styleUrls: ['./pet-details.component.css'],
  standalone: true,
  imports: [CommonModule, RecordItemComponent],
})
export class PetDetailsComponent implements OnInit {
  pet: Pet | null = null;
  petId: string | null = null;
  records: MedicalRecord[] = [];

  constructor(
    private petService: PetService,
    private recordService: RecordService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('id');
    if (this.petId) {
      this.loadPet();
      this.loadRecords();
    }
  }

  loadPet() {
    this.petService.getPetById(this.petId!).subscribe({
      next: (data) => (this.pet = data),
      error: (err) => console.error('Error loading pet', err),
    });
  }

  loadRecords() {
    this.recordService.getRecordsByPetId(this.petId!).subscribe({
      next: (data) => {
        this.records = data;
        console.log('Loaded records:', data);
      },
      error: (err) => console.error('Error loading records', err),
    });
  }
  onAddRecord() {
    this.router.navigate([`/pets/${this.petId}/records/new`]);
  }

  onEditPet() {
    this.router.navigate([`/pets/${this.petId}/edit/`]);
  }
}
