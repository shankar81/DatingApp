import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Member } from '../models/member';
import { map, of } from 'rxjs';
import { Photo } from '../models/photo';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers() {
    if (this.members.length > 0) return of(this.members);
    return this.http
      .get<Member[]>(`${this.baseUrl}/users`)
      .pipe(map((members) => (this.members = members)));
  }

  getMember(username: string) {
    const member = this.members.find((el) => el.userName === username);
    if (member) return of(member);
    return this.http.get<Member>(`${this.baseUrl}/users/${username}`);
  }

  updateMember(member: Member) {
    return this.http.put(`${this.baseUrl}/users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);
        this.members[index] = { ...this.members[index], ...member };
      })
    );
  }

  setMainPhoto(id: number) {
    return this.http.put(`${this.baseUrl}/users/set-main-photo/${id}`, {});
  }

  deletePhoto(id: number) {
    return this.http.delete(`${this.baseUrl}/users/delete-photo/${id}`, {});
  }
}
