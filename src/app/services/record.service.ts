import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MedicalRecord } from '../components/records/record.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  private apiUrl = 'http://localhost:3000/records';

  constructor(private http: HttpClient) {}

  // get all records for a specific pet
  getRecordsByPetId(petId: string): Observable<MedicalRecord[]> {
    return this.http.get<MedicalRecord[]>(`${this.apiUrl}/pet/${petId}`);
  }

  //get record by id
  getRecordById(id: string): Observable<MedicalRecord> {
    return this.http.get<MedicalRecord>(`${this.apiUrl}/${id}`);
  }

  //create record
  createRecord(record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.post<MedicalRecord>(this.apiUrl, record);
  }

  //update record
  updateRecord(id: string, record: MedicalRecord): Observable<MedicalRecord> {
    return this.http.put<MedicalRecord>(`${this.apiUrl}/${id}`, record);
  }

  //delete record
  deleteRecord(id: string): Observable<MedicalRecord> {
    return this.http.delete<MedicalRecord>(`${this.apiUrl}/${id}`);
  }
}
