import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { User } from '../interfaces/user.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UsersParams } from '../interfaces/users-params.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users: BehaviorSubject<User[]> = new BehaviorSubject<User[]>([]);
  private isLoadingUsers: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  public get users$(): Observable<User[]> {
    return this.users.asObservable();
  }

  public get isLoadingUsers$(): Observable<boolean> {
    return this.isLoadingUsers.asObservable();
  }

  constructor(private http: HttpClient) {}

  public addUsers(params: UsersParams): Observable<User[]> {
    this.isLoadingUsers.next(true);
    return this.addUsersHttp(params).pipe(
      map((res) => {
        this.users.next([...this.users.getValue(), ...(res.results as User[])]);
        this.isLoadingUsers.next(false);
        return res.results as User[];
      }),
    );
  }

  private addUsersHttp(params: UsersParams): Observable<any> {
    const body = {
      params: {
        gender: params.gender,
        nationality: params.nationality,
        results: params.amount,
      },
    };
    return this.http.get(environment.apiUrl, body);
  }

  public deleteUser(uuid: string): void {
    const users = this.users.getValue();
    const userIndex = users.findIndex((user) => user.login.uuid === uuid);

    if (userIndex !== -1) {
      users.splice(userIndex, 1);
      this.users.next(users);
    }
  }

  public editUser(user: User, uuid: string): void {
    const users = this.users.getValue();
    const userIndex = users.findIndex((u) => u.login.uuid === uuid);

    if (userIndex !== -1) {
      users[userIndex] = user;
      this.users.next(users);
    }
  }
}
