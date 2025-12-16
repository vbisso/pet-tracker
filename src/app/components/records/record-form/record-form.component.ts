import { Component, OnInit } from '@angular/core';
import { MedicalRecord } from '../record.model';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecordService } from '../../../services/record.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-record-form',
  templateUrl: './record-form.component.html',
  styleUrls: ['./record-form.component.css'],
  imports: [FormsModule, CommonModule],
  standalone: true,
})
export class RecordFormComponent implements OnInit {
  isEdit = false;
  recordId: string | null = null;
  petId: string | null = null;

  record: MedicalRecord = {
    petId: '',
    type: '',
    description: '',
    date: '',
    vet: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recordService: RecordService
  ) {}

  ngOnInit(): void {
    // petId when creating (/pets/:petId/records/new)
    // recordId when editing (/records/:recordId/edit)
    this.petId = this.route.snapshot.paramMap.get('petId');
    this.recordId = this.route.snapshot.paramMap.get('recordId');

    //create
    if (this.petId && !this.recordId) {
      this.isEdit = false;
      this.record.petId = this.petId;
      return;
    }
    //edit
    if (this.recordId) {
      this.isEdit = true;
      this.loadRecord(this.recordId);
    }
  }

  loadRecord(id: string) {
    this.recordService.getRecordById(id).subscribe({
      next: (data) => {
        this.record = data;
        this.petId = data.petId;
      },
      error: (err) => console.error('Error fetching record', err),
    });
  }

  onSubmit() {
    if (this.isEdit) {
      this.updateRecord();
    } else {
      this.createRecord();
    }
  }

  ///LEFT HERE~!!! CREATING A RECORDS!!
  createRecord() {
    this.recordService.createRecord(this.record).subscribe({
      next: () => this.router.navigate([`/pets/${this.record.petId}`]),
      error: (err) => console.error('Error creating record', err),
    });
  }

  updateRecord() {
    this.recordService.updateRecord(this.recordId!, this.record).subscribe({
      next: () => this.router.navigate([`/pets/${this.record.petId}`]),
      error: (err) => console.error('Error updating record', err),
    });
  }
}
