import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { User } from './User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usersUrl: string;
  private usersLoginUrl: string;
  private userSaveUrl: string;

  constructor(private http: HttpClient) {
    this.usersUrl = 'https://localhost:8443/rest/v1/users';
    this.usersLoginUrl = 'https://localhost:8443/login';
    this.userSaveUrl = 'https://localhost:8443/rest/v1/users/add';
  }

  public retrieveAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public saveUser(user: User) {
    return this.http.post<User>(this.userSaveUrl, user);
  }

  // public loginUser(user: User) {
  // //old
  //   return this.http.post<User>(this.usersLoginUrl, user);
  // }

  public loginUser(user: User): Object {
  //   let body = {
  //     'username': user.username,
  //     'password': user.password
  //   }
  //   console.log(body)

    // let body = new URLSearchParams();
    // body.set('username', user.username);
    // body.set('password', user.password);

    let body = `username=${user.username}&password=${user.password}`;
    
    // let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    // let headers = new HttpHeaders({'Content-Type' : 'application/x-www-form-urlencoded',
    //                                 'Access-Control-Allow-Origin' : '*',
    //                                 'Access-Control-Allow-Methods' : 'POST',
    //                                 'Access-Control-Allow-Headers' : 'Content-Type, Authorization'
    //                               });

    const httpOptions = {
      headers: new HttpHeaders({ 
        'Content-Type' : 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin':'*'
      })
    };

    // let requestOptions = {
    //   headers: new Headers(headers);
    // }

    let result: Object;
    result = new Object();
    this.http.post(this.usersLoginUrl, body, /*{headers: headers}*/ httpOptions).subscribe((res) => {
        result = res;
        console.log('Hello from LOGIN');
        console.log(result);
        console.log('HEYYY')
      });

    return result;
  }


}
