import { Component, Input, Output, EventEmitter } from '@angular/core';
import { MedicalRecord } from '../record.model';
import { RecordService } from '../../../services/record.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-record-item',
  templateUrl: './record-item.component.html',
  styleUrls: ['./record-item.component.css'],
  standalone: true,
})
export class RecordItemComponent {
  @Input() record!: MedicalRecord;
  @Output() deleted = new EventEmitter<void>();
  constructor(private recordService: RecordService, private router: Router) {}

  onEdit() {
    // navigate to edit form
    if (!this.record._id) return;
    this.router.navigate([`/records/${this.record._id}/edit`]);
  }

  onDelete() {
    if (!this.record._id) return;

    const confirmDelete = confirm(
      'Are you sure you want to delete this record?'
    );

    if (!confirmDelete) return;

    this.recordService.deleteRecord(this.record._id).subscribe({
      next: () => {
        this.deleted.emit();
      },
      error: (err) => console.error('Error deleting record:', err),
    });
  }
}
