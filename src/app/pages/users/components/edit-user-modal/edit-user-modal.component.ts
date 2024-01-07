import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../shared/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nationality } from '../../../../shared/interfaces/nationality.interface';
import { NATIONALITIES } from '../../../../shared/data/nationalities.data';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from '../../../../shared/services/user.service';

@Component({
  selector: 'app-edit-user-modal',
  templateUrl: './edit-user-modal.component.html',
  styleUrls: ['./edit-user-modal.component.scss'],
})
export class EditUserModalComponent implements OnInit {
  userForm!: FormGroup;
  dataSource!: MatTableDataSource<User>;

  get nationalities(): Nationality[] {
    return NATIONALITIES;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA)
    private data: { user: User; dataSource: MatTableDataSource<User> },
    private fb: FormBuilder,
    private usersService: UserService,
  ) {
    this.dataSource = data.dataSource;
  }

  protected onSubmit(): void {
    this.usersService.editUser(this.userForm.value, this.data.user.login.uuid);
  }

  protected getNationalityFlag(nationality: string): string {
    return `https://flagcdn.com/16x12/${nationality}.png`;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: this.fb.group({
        first: [this.data.user.name.first, Validators.required],
        last: [this.data.user.name.last, Validators.required],
      }),
      location: this.fb.group({
        country: [this.data.user.location.country, Validators.required],
        street: this.fb.group({
          name: [this.data.user.location.street.name, Validators.required],
        }),
      }),
      gender: [this.data.user.gender, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      login: this.fb.group({
        username: [this.data.user.login.username, [Validators.required]],
      }),
      phone: [
        this.data.user.phone,
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
    });
  }
}
