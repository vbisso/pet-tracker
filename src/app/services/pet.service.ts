import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pet } from '../components/pets/pet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetService {
  private apiUrl = 'http://localhost:3000/pets';
  constructor(private http: HttpClient) {}

  //get all pets
  getPets(): Observable<Pet[]> {
    return this.http.get<Pet[]>(this.apiUrl);
  }

  //get pet by id
  getPetById(id: string): Observable<Pet> {
    return this.http.get<Pet>(`${this.apiUrl}/${id}`);
  }

  //create pet
  createPet(pet: Pet): Observable<Pet> {
    return this.http.post<Pet>(this.apiUrl, pet);
  }

  //update pet
  updatePet(id: string, pet: Pet): Observable<Pet> {
    return this.http.put<Pet>(`${this.apiUrl}/${id}`, pet);
  }

  //delete pet
  deletePet(id: string): Observable<Pet> {
    return this.http.delete<Pet>(`${this.apiUrl}/${id}`);
  }
}
