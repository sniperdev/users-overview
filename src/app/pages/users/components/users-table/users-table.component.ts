import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { User } from '../../../../shared/interfaces/user.interface';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';

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
    'options',
  ];

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  protected editUser(user: User) {
    this.dialog.open(EditUserModalComponent, {
      height: '500px',
      width: '600px',
      data: {
        user,
        dataSource: this.dataSource,
      },
    });
  }

  protected deleteUser(user: User) {
    this.dataSource.data = this.dataSource.data.filter(
      (element) => element.id.name !== user.id.name,
    );
  }

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
