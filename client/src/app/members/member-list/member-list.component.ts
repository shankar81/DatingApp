import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { MembersService } from '../../services/members.service';
import { Member } from '../../models/member';
import { CommonModule } from '@angular/common';
import { MemberCardComponent } from '../member-card/member-card.component';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [CommonModule, MemberCardComponent],
  templateUrl: './member-list.component.html',
  styleUrl: './member-list.component.css',
})
export class MemberListComponent implements OnInit {
  memberList: Member[] = [];

  constructor(private memberSerivce: MembersService) {}

  ngOnInit(): void {
    this.memberSerivce.getMembers().subscribe({
      next: (members) => (this.memberList = members),
    });
  }
}
