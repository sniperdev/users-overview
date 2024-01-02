import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { User } from '../../../../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements AfterViewInit {
  // @Input() users: User[] | null = [];
  @Input() set users(users: User[] | null) {
    this.dataSource = new MatTableDataSource<User>(users as User[]);
    this.dataSource.sort = this.sort;
    // console.log(this.dataSource, users);
  }
  @ViewChild(MatSort) sort!: MatSort;

  dataSource = new MatTableDataSource<User>(this.users as User[]);

  protected displayedColumns: string[] = [
    'name',
    'lastname',
    'country',
    'gender',
  ];

  protected getName(user: User) {
    return user.name.first;
  }
  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
