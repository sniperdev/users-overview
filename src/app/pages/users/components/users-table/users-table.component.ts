import { Component, Input } from '@angular/core';
import { User } from '../../../../shared/interfaces/user.interface';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent {
  @Input() users: User[] | null = [];
  protected displayedColumns: string[] = [
    'name',
    'lastname',
    'country',
    'gender',
  ];
}
