import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../../../shared/interfaces/user.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Nationality } from '../../../../shared/interfaces/nationality.interface';
import { NATIONALITIES } from '../../../../shared/data/nationalities.data';
import { MatTableDataSource } from '@angular/material/table';

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
  ) {
    this.dataSource = data.dataSource;
  }

  protected onSubmit(): void {
    const updatedUser = this.userForm.value;
    const userIndex = this.dataSource.data.findIndex(
      (user) => user.id.name === this.data.user.id.name,
    );
    this.dataSource.data[userIndex] = {
      ...this.dataSource.data[userIndex],
      ...updatedUser,
    };
    this.dataSource._updateChangeSubscription();
  }

  protected getNationalityFlag(nationality: string): string {
    return `https://flagcdn.com/16x12/${nationality}.png`;
  }

  ngOnInit() {
    this.userForm = this.fb.group({
      name: [this.data.user.name.first, Validators.required],
      surname: [this.data.user.name.last, Validators.required],
      country: [this.data.user.location.country, Validators.required],
      gender: [this.data.user.gender, Validators.required],
      email: [this.data.user.email, [Validators.required, Validators.email]],
      username: [this.data.user.login.username, [Validators.required]],
      phone: [
        this.data.user.phone,
        [Validators.required, Validators.pattern(/^\d+$/)],
      ],
      address: [this.data.user.location.street.name, Validators.required],
    });
  }
}
