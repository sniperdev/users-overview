import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';

import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy, OnInit,
  ViewChild,
} from '@angular/core';
import { User } from '../../../../shared/interfaces/user.interface';
import { EditUserModalComponent } from '../edit-user-modal/edit-user-modal.component';
import { DeleteUserModalComponent } from '../delete-user-modal/delete-user-modal.component';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  private usersSubscription!: Subscription;

  protected users$: Observable<User[]> = this.userService.users$;
  protected dataSource = new MatTableDataSource<User>();
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
    private userService: UserService,
  ) {}

  protected editUser(user: User) {
    this.dialog.open(EditUserModalComponent, {
      height: '450px',
      width: '540px',
      data: {
        user,
        dataSource: this.dataSource,
      },
    });
  }

  protected deleteUser(user: User) {
    this.dialog.open(DeleteUserModalComponent, {
      height: '180px',
      width: '500px',
      data: {
        uuid: user.login.uuid,
      },
    });
  }

  public navigateToDetails(user: User) {
    this.router.navigate([`user-details/${user.login.uuid}`], {
      relativeTo: this.route,
    });
  }

  protected getNationalityFlag(nationality: string): string {
    return `https://flagcdn.com/16x12/${nationality.toLowerCase()}.png`;
  }

  protected getName(user: User) {
    return user.name.first;
  }

  ngOnInit() {
    this.usersSubscription = this.users$.subscribe((users) => {
      this.dataSource = new MatTableDataSource<User>(users);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngOnDestroy() {
    this.usersSubscription.unsubscribe();
  }
}
