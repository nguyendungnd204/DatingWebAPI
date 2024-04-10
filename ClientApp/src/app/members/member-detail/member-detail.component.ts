import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../../home/home.component';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import {TabsModule} from 'ngx-bootstrap/tabs'
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryModule, NgxGalleryOptions } from '@kolkov/ngx-gallery';
@Component({
  selector: 'app-member-detail',
  standalone: true,
  imports: [CommonModule,HomeComponent,FormsModule,RouterModule,TabsModule, NgxGalleryModule],
  templateUrl: './member-detail.component.html',
  styleUrl: './member-detail.component.css'
})
export class MemberDetailComponent implements OnInit {

 member : Member | undefined
  galleryOptions: NgxGalleryOptions[] = []
 galleryImages: NgxGalleryImage[] =[]
  constructor( private memberService: MembersService, private route : ActivatedRoute) {
    
    
  }
  ngOnInit(): void {
    this.loadMember()

    this.galleryOptions=[{
      width : '500px',
      height : '500px',
      imagePercent:100,
      thumbnailsColumns:4,
      imageAnimation: NgxGalleryAnimation.Slide,
      preview:false

    }

    ]
    

    }
    getImages(): NgxGalleryImage[] {
      const imageUrl: NgxGalleryImage[] = [];
      if (this.member && this.member.photos) {
        for (const photo of this.member.photos) {
          imageUrl.push({
            small: photo.url || '',
            medium: photo.url || '',
            big: photo.url || ''
          });
        }
      }
      return imageUrl;
    }
  loadMember(){
    this.memberService.getMember(this.route.snapshot.paramMap.get('username')!).subscribe(member => {
      this.member = member
      this.galleryImages = this.getImages()
    })
    
      
  }

}
