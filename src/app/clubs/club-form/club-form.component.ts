import { Component, OnInit, ViewChild, viewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClubsService } from '../clubs.service';
import { UserService } from '../../users/service/user.service';
import { FormGroup, FormBuilder, Validators, FormControl, NgForm } from '@angular/forms';
import { User } from '../../models/user';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { Club } from '../../models/club';
import { MatOptionModule } from '@angular/material/core';
import { MatInputModule} from '@angular/material/input';
import { FormsModule } from '@angular/forms';





@Component({
  selector: 'app-club-form',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
    ClubFormComponent,
    MatFormField,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    FormsModule,
  
  ],
  templateUrl: './club-form.component.html',
  styleUrls: ['./club-form.component.scss']
})
export class ClubFormComponent implements OnInit {
  form!: FormGroup;
  supervisors: User[] = [];
  clubName: string = '';
  selectedSupervisorId: number | null = null;
  isLoading = false;
  club = new Club;
  @ViewChild("clubForm")clubForm!:NgForm;

  constructor(
    private clubsService: ClubsService,
    private dialogRef: MatDialogRef<ClubFormComponent>,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: ['', Validators.required],
      supervisor: [null, Validators.required]
    });

    this.loadSupervisors();
  }

  compareModels(o1: any, o2: any): boolean {
    return o1 && o2 && o1.id == o2.id;
  }

  loadSupervisors() {
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.supervisors = data.users;
      },
      error: (error) => {
        console.error('Error fetching supervisors:', error);
      }
    });
  }

  onSubmit(): void {
    
    if (this.clubForm.valid) {
      

      this.isLoading = true;
      this.clubsService.storeClub(this.club).subscribe({
        next: () => {
          this.isLoading = false;
          this.dialogRef.close();
        },
        error: (error) => {
          this.isLoading = false;
          console.error('Error storing club:', error);
        }
      });
    }
  }

  onCancel() {
    this.dialogRef.close();
  }
}
