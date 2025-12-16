import { Component, OnInit } from '@angular/core';
import { Pet } from '../pet.model';
import { FormsModule } from '@angular/forms';
import { PetService } from '../../../services/pet.service';
import { ActivatedRoute, Router } from '@angular/router';

import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pet-form',
  templateUrl: './pet-form.component.html',
  standalone: true,
  styleUrls: ['./pet-form.component.css'],
  imports: [CommonModule, FormsModule],
})
export class PetFormComponent implements OnInit {
  isEdit = false;
  petId: string | null = null;
  pet: Pet = {
    name: '',
    species: '',
    breed: '',
    birthdate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private petService: PetService
  ) {}

  ngOnInit(): void {
    this.petId = this.route.snapshot.paramMap.get('id');
    if (this.petId) {
      this.isEdit = true;
      this.loadPet();
    }
  }

  loadPet() {
    this.petService.getPetById(this.petId!).subscribe({
      next: (data) => (this.pet = data),
      error: (err) => console.error('Error loading pet', err),
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.updatePet();
    } else {
      this.createPet();
    }
  }

  createPet() {
    this.petService.createPet(this.pet).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error creating pet', err),
    });
  }

  updatePet() {
    this.petService.updatePet(this.petId!, this.pet).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => console.error('Error updating pet', err),
    });
  }
}
