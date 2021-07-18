import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;
  private usersLoginUrl: string;
  private userSaveUrl: string;
  private userLogOffUrl: string;
  private user?: User;

    constructor(private http: HttpClient) {
    this.usersUrl = 'https://localhost:8443/rest/v1/users';
    this.usersLoginUrl = 'https://localhost:8443/rest/v1/users/login';
    this.userSaveUrl = 'https://localhost:8443/rest/v1/users/add';
    this.userLogOffUrl = 'https://localhost:8443/rest/v1/users/logoff';
  }

  public retrieveAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public saveUser(user: User) {
    return this.postUser(this.userSaveUrl, user);
  }

  public loginUser(username: string, password: string): Subject<User> {

    let body = new User(username, password);
    return this.postUser(this.usersLoginUrl, body);
  }

  private postUser(url: string, user: User): Subject<User> {
    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };

    const subject = new ReplaySubject<User>(5);

    subject.subscribe(res => this.user = res, err => console.log(err));

    this.http.post<User>(url, user, httpOptions)
      .subscribe(
        res => {
          subject.next(res)
        },
        err => subject.error(err))

    return subject;
  }

  public getCurrentUser(): User | undefined {
    return this.user;
  }

  public logOff() {
    console.log("init logoff")

    const httpOptions =
     {
      headers: new HttpHeaders({ 
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };


    this.http.post(this.userLogOffUrl, "", httpOptions)
      .subscribe(
        res => this.user = undefined,
        err => console.log(err),
        () => console.log("log off done")
        );
  }
}
