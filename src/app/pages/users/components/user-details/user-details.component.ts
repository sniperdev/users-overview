import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from '../../../../shared/interfaces/user.interface';
import { UserService } from '../../../../shared/services/user.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  private users$ = this.userService.users$;
  public userId!: string;
  protected currentUser!: User | undefined;

  constructor(
    route: ActivatedRoute,
    private userService: UserService,
  ) {
    route.params.subscribe((params) => {
      this.userId = params['name'];
    });
  }

  ngOnInit() {
    this.users$
      .pipe(map((users) => users.find((user) => user.id.name === this.userId)))
      .subscribe((user) => (this.currentUser = user));
  }
}
