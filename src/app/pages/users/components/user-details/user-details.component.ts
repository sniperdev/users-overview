import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent {
  public userId!: string;

  constructor(route: ActivatedRoute) {
    route.params.subscribe((params) => {
      this.userId = params['name'];
    });
  }
}
