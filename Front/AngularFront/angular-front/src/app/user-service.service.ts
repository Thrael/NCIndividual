import { EventBusService } from './eventsourcing/eventbus.service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { User } from './User';
import { BusEvent } from './eventsourcing/bus-event';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string = 'https://localhost:8443/rest/v1/users';
  private usersLoginUrl: string = 'https://localhost:8443/rest/v1/users/login';
  private userSaveUrl: string = 'https://localhost:8443/rest/v1/users/add';
  private userLogOffUrl: string = 'https://localhost:8443/rest/v1/users/logoff';
  private user?: User;

    constructor(
      private http: HttpClient, 
      private eventService: EventBusService) {}

  public retrieveAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public saveUser(user: User) {
    return this.postUser(this.userSaveUrl, user);
  }

  public loginUser(username: string, password: string): Subject<User> {
    
    const loginForm: FormData = new FormData();
    loginForm.append('username', username);
    loginForm.append('password', password);

    const subject = new ReplaySubject<User>(5);
    subject.subscribe(
      res => {
        this.user = res
        this.eventService.post(new BusEvent("login", "OK", "login success", res))
      },
      err => { 
        this.eventService.post(new BusEvent("login", "NOK", "login error", err))
        console.log(err)
      });

    this.http.post<User>(this.usersLoginUrl, loginForm, {
      headers: new HttpHeaders({ 
        //'Content-Type' : 'application/x-www-form-urlencoded',  https://github.com/github/fetch/issues/505
        'Access-Control-Allow-Origin':'*'
      })
    })
      .subscribe(
        res => {
          subject.next(res)
        },
        err => subject.error(err))

    return subject;
  }

  private postUser(url: string, user: User): Subject<User> {

    const subject = new ReplaySubject<User>(5);
    subject.subscribe(res => this.user = res, err => console.log(err));

    this.http.post<User>(url, user, this.getHttpOptions())
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

    this.http.post(this.userLogOffUrl, "", this.getHttpOptions())
      .subscribe(
        res => this.user = undefined,
        err => console.log(err),
        () => console.log("log off done")
        );
  }

  private getHttpOptions() {
    return {
      headers: new HttpHeaders({ 
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin':'*'
      })
    };
  }
}
