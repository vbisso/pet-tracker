import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Pet } from '../pet.model';
import { PetService } from '../../../services/pet.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pet-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css'],
})
export class PetListComponent implements OnInit {
  pets: Pet[] = []; // will come from service later

  constructor(private petService: PetService, private router: Router) {}

  ngOnInit(): void {
    this.loadPets();
  }

  loadPets() {
    this.petService.getPets().subscribe({
      next: (data) => (this.pets = data),
      error: (err) => console.error('Error loading pets', err),
    });
  }

  onAddPet() {
    this.router.navigate(['pets/new']);
  }

  onViewPet(id: string) {
    this.router.navigate([`/pets/${id}`]);
  }
}
