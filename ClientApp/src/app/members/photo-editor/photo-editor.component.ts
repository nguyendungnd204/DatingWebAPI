import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { CommonModule } from '@angular/common';
import { FileUploadModule, FileUploader } from 'ng2-file-upload';
import { config } from '../../app.config';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { filter, take } from 'rxjs';
import { response } from 'express';
import { MembersService } from '../../_services/members.service';
import { Photo } from '../../_models/photo';

@Component({
  selector: 'app-photo-editor',
  standalone: true,
  imports: [CommonModule,FileUploadModule],
  templateUrl: './photo-editor.component.html',
  styleUrl: './photo-editor.component.css'
})
export class PhotoEditorComponent implements OnInit{
  @Input() member: Member |undefined
  uploader:FileUploader|undefined
  hasBaseDropzoneOver=false
  baseUrl = config.apiUrl;
  user: User | null = null;
  
 
  constructor(private accountService: AccountService, private memberService : MembersService){
    this.accountService.currentUser$
    .pipe(take(1) )
    .subscribe(user => {
      this.user = user;
    });
  }

  ngOnInit(): void {
    this.initializeUploader()
      
  }
  fileOverBase(e:any){
    this.hasBaseDropzoneOver=e
  }
  setMainPhoto(photo: Photo) {
    if (!this.user || !this.member) return; // Kiểm tra nếu user hoặc member là null hoặc undefined
    
    this.memberService.setMainPhoto(photo.id).subscribe(() => {
      if (!this.user || !this.member) return; // Kiểm tra lại nếu user hoặc member là null hoặc undefined
      this.user.photoUrl = photo.url;
      this.accountService.setCurrentUser(this.user);
      this.member.photoUrl = photo.url; // Truy cập trực tiếp vào thuộc tính photoUrl của member
      this.member.photos.forEach(p => {
        if (p.isMain) p.isMain = false;
        if (p.id === photo.id) p.isMain = true;
      });
    });
  }
  deletePhoto(photoId: number) {
    this.memberService.deletePhoto(photoId).subscribe(() => {
      if (this.member) {
        this.member.photos = this.member.photos.filter(x => x.id != photoId);
      }
    });
  }
  
  initializeUploader(){
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/add-photo',
      authToken:'Bearer '+this.user?.token,
      isHTML5:true,
      allowedFileType:['image'],
      removeAfterUpload:true,
      autoUpload:false,
      maxFileSize:10*1024*1024

    })
    this.uploader.onAfterAddingFile=(file)=>
      {
        file.withCredentials=false
      }
      this.uploader.onSuccessItem=(item, response,status,headers)=>{
        if(response){
          const photo = JSON.parse(response)
          this.member?.photos.push(photo)
        }
      }
  }

}
