import { Component, OnInit } from '@angular/core';
import { Member } from '../../models/member';
import { MembersService } from '../../services/members.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { MessagesComponent } from '../../messages/messages.component';
import { ImageItem, GalleryModule } from 'ng-gallery';

@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule, GalleryModule, NgbNavModule, MessagesComponent],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css',
})
export class MemberDetailComponent implements OnInit {
  member?: Member;
  images: ImageItem[] = [];
  active = 1;

  constructor(
    private memberService: MembersService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const username = this.route.snapshot.paramMap.get('username');
    if (!username) return;
    this.memberService.getMember(username).subscribe({
      next: (value) => {
        this.member = value;
        this.getImages();
      },
    });
  }

  getImages() {
    if (!this.member) return;
    for (let image of this.member.photos) {
      this.images.push(new ImageItem({ src: image.url, thumb: image.url }));
    }
  }

  onNavChange(changeEvent: NgbNavChangeEvent) {
    this.active = changeEvent.nextId;
  }
}
