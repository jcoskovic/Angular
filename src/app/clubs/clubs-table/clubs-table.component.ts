import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../clubs.service';
import { Club } from '../../models/club';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ClubFormComponent } from '../club-form/club-form.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-clubs-table',
  standalone: true,
  imports: [
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './clubs-table.component.html',
  styleUrl: './clubs-table.component.scss'
})
export class ClubsTableComponent implements OnInit {
    clubs?: Club[];
    dataSource!: MatTableDataSource<Club>;

    displayedColumns: string[] = ['id' , 'name', 'settings'];


    constructor (
      public clubsService: ClubsService,
      public dialog: MatDialog,
    ){}

    ngOnInit(): void {
        this.loadClubs();
    }

    loadClubs() {
      this.clubsService.getClubs().subscribe({
        next: (data) => {
          this.clubs = data.clubs;
          this.dataSource = new MatTableDataSource(data.clubs);
        },
        error: (error) => {
          console.error('Error loading clubs:', error);
        }
      });
    }
  
    deleteClub(club: Club): void {
      
      if (confirm(`Are you sure you want to delete club ${club.name}?`)) {
        if (club.id !== undefined) {      
          this.clubsService.deleteClub(club.id).subscribe({
            next: () => {
              this.loadClubs();
            },
            error: (error) => {
              console.error(`Error deleting club with id ${club.id}:`, error);
            }
          });
        } else {
          console.error('Club ID is undefined.');
        }
      }
    }


    addNewClub() {
      const dialogRef = this.dialog.open(ClubFormComponent, {
        width: '400px'
      });
  
      dialogRef.afterClosed().subscribe(result => {
        this.loadClubs(); 
      });
    }
}
