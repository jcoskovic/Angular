import { Component, OnInit } from '@angular/core';
import { ClubsService } from '../clubs.service';
import { Club } from '../../models/club';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-clubs-table',
  standalone: true,
  imports: [
    MatTableModule,
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
    ){}

    ngOnInit(): void {
        this.loadClubs();
    }

    loadClubs() {
      this.clubsService.getClubs().subscribe({
        next: (data) => {
          this.clubs = data.clubs;
          console.log('Loaded clubs:', this.clubs);
          this.dataSource = new MatTableDataSource(data.clubs);
        },
        error: (error) => {
          console.error('Error loading clubs:', error);
        }
      });
    }
  
    deleteClub(club: Club): void {
      console.log('Attempting to delete club:', club);
      if (confirm(`Are you sure you want to delete club ${club.name}?`)) {
        if (club.id !== undefined) {
          console.log(`Deleting club with id: ${club.id}`);
          this.clubsService.deleteClub(club.id).subscribe({
            next: () => {
              console.log(`Club with id ${club.id} deleted successfully`);
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
}
