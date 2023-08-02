import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpErrorResponse, HttpStatusCode} from '@angular/common/http';
import { environment } from 'src/environments/environmet';
import { CreateUsertDTO, User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiUrl = `${environment.API_URL}/api/users`;

  constructor(
    private http: HttpClient
  ) { }

  create(dto: CreateUsertDTO){
    return this.http.post(this.apiUrl, dto);
  }

  getAll() {
    return this.http.get<User[]>(this.apiUrl);
  }
}
