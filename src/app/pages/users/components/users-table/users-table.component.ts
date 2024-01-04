import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { User } from '../../../../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements AfterViewInit {
  @Input() set users(users: User[] | null) {
    this.dataSource = new MatTableDataSource<User>(users as User[]);
    this.dataSource.paginator = this.paginator;
  }
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  protected dataSource = new MatTableDataSource<User>(this.users as User[]);
  protected displayedColumns: string[] = [
    'name',
    'lastname',
    'country',
    'gender',
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  public navigateToDetails(user: User) {
    this.router.navigate([`user-details/${user.id.name}`], {
      relativeTo: this.route,
    });
  }

  protected getName(user: User) {
    return user.name.first;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
}
