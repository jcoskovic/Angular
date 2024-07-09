import { Routes } from '@angular/router';
import { ClubsTableComponent } from './clubs/clubs-table/clubs-table.component';
import { UsersTableComponent } from './users/users-table/users-table.component';


export const routes: Routes = [
    {
        path:"clubs",
        component: ClubsTableComponent,
    },
    {
        path:"users",
        component: UsersTableComponent,
    }
];
