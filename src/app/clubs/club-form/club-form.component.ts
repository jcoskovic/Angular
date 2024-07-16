import { Component, Inject, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ClubsService } from '../clubs.service';
import { UserService } from '../../users/service/user.service';
import { FormGroup, FormBuilder, Validators, NgForm } from '@angular/forms';
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
import { MAT_DIALOG_DATA } from '@angular/material/dialog';





@Component({
  selector: 'app-club-form',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
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
  club: Club = new Club();
  form!: FormGroup;
  supervisors: User[] = [];
  clubName: string = '';
  selectedSupervisorId: number | null = null;
  isLoading = false;
  @ViewChild("clubForm")clubForm!:NgForm;

  constructor(
    private clubsService: ClubsService,
    public dialogRef: MatDialogRef<ClubFormComponent>,
    private userService: UserService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:{club: Club}
  ) {}

  ngOnInit(): void {
    if(this.data.club && this.data.club.id){
      this.clubsService.getClub(this.data.club.id).subscribe({
        next: (data) => {
          this.club = data.club;
          console.log('Club:', this.club, this.data.club);
        },
        error: (error) => {
          console.error('Error fetching club:', error);
        }
      });
    }

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
      console.log('Updating club:', this.club);
      if (this.club && this.club.id) {
        
        this.clubsService.updateClub(this.club).subscribe({
          next: (updatedClub) => {
            this.isLoading = false;
            
            this.dialogRef.close(true); 
          },
          error: (error) => {
            this.isLoading = false;
            console.error('Error updating club:', error);
           
          }
        });
      } else {
        console.log('Creating club:', this.club);
        this.clubsService.storeClub(this.clubForm.value).subscribe({
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
  }

  

  onCancel() {
    this.dialogRef.close();
  }
}
