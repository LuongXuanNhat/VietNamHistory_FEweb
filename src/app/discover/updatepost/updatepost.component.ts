import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component,ViewChild, inject, ElementRef, OnInit } from '@angular/core';
import { FormControl,FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreatePostRequest, PostResponse, Topic } from 'src/app/ObjectClass/object';
import { PublicserviceService } from 'src/app/service/publicservice.service';
import {MatAutocompleteSelectedEvent, MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatChipInputEvent, MatChipsModule} from '@angular/material/chips';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import { ChangeEvent } from '@ckeditor/ckeditor5-angular/ckeditor.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from 'src/app/service/datashare/data.service';


@Component({
  selector: 'app-updatepost',
  templateUrl: './updatepost.component.html',
  styleUrls: ['./updatepost.component.css']
})
export class UpdatepostComponent implements OnInit{
  postId: string = '';
  subId: string  = '';
  postData!: PostResponse;
  updatepostform = this._formBuilder.group({
    Title: ['', [Validators.required, Validators.maxLength(255)]],
    Content: [' ', Validators.required],
    Image: [''],
    TopicId: ['', Validators.required],
    TopicName: ['', Validators.required],
    Tag: [[] as string[]]
  });
  currentDate = this.service.getCurrentDate();
  isEditable = true;
  public Editor = ClassicEditor;
  
  selectedImage: string | null = null;
  topics: Topic[] = [];
  listTopic: string[] = [];
  choosetopic: string[] = [];
  topicCtrl = new FormControl('');
  filteredTopics : Observable<string[]>;
  announcer = inject(LiveAnnouncer);
  separatorKeysCodes: number[] = [ENTER, COMMA];
  @ViewChild('topicInput') topicInput!: ElementRef<HTMLInputElement>;

  listTag: string[] = [];
  chooseTag: string[] = [];
  tagCtrl = new FormControl('');
  filteredTags : Observable<string[]>;
  announcerTag = inject(LiveAnnouncer);
  separatorKeysCodesTag: number[] = [ENTER, COMMA];
  @ViewChild('TagInput') TagInput!: ElementRef<HTMLInputElement>;

  public editorConfig = {
    toolbar: ['undo','redo', '|','heading', '|', 'bold', 'italic','bulletedList', 'numberedList', 'link','insertTable','blockQuote','mediaEmbed',],
    placeholder: 'Nhập nội dung ở đây...',
    language: 'vi',
  };
  onEditorChange( { editor }: ChangeEvent )  {
    // const data = editor.getData();
    // this.createpostform.get('Content')?.setValue(data);
  }

  constructor(private _formBuilder: FormBuilder, public service: PublicserviceService,
    private router: Router, private  toastr: ToastrService, private dialogRef: MatDialogRef<UpdatepostComponent>,
    private dataService: DataService) {
    this.GetAllTopic();
    this.GetAllTag();
    this.filteredTopics = this.topicCtrl.valueChanges.pipe(
      startWith(null),
      map((topic: string | null) => (topic ? this._filterTopic(topic) : this.listTopic.slice())),
    );
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((topic: string | null) => (topic ? this._filterTag(topic) : this.listTag.slice())),
    );
  }
  ngOnInit(): void {
    this.dataService.currentSubId.subscribe(subId => {
      this.subId = subId ?? this.subId;
      this.getDetail(this.subId);
      console.log(this.updatepostform.value.Title);
    });
  }
  getDetail(postId: string){
    this.service.GetPostDetail(this.subId).subscribe(
      (data: any) => {
        this.postData = data.resultObj;
        this.updatepostform.patchValue({
          Tag: this.postData.tags.map(tag => tag.name),
          Title: this.postData.title,
          Content: this.postData.content,
          Image: this.postData.image ,
          TopicName: this.postData.topicName
        })
        this.choosetopic.push(this.postData.topicName);
        this.chooseTag = this.updatepostform.value.Tag as string[];
      }
    )
  }
  addTopic(event: MatChipInputEvent): void {
    const value = event.value;
    if (value && this.isValueInList(value)) {
      if(this.choosetopic.length > 0){
        this.choosetopic[0] = value;
      } else {
        this.choosetopic.push(value);
      }
    }
    event.chipInput!.clear();
    this.topicCtrl.setValue(null);
  }
  isValueInList(value: string): boolean {
    return this.listTopic.indexOf(value) !== -1;
  }
  addTag(event: MatChipInputEvent): void {
    const value = event.value;
    if (value && this.isDupplication(value) && this.chooseTag.length <= 5) {
        this.chooseTag.push(value);
    }
    event.chipInput!.clear();
    this.tagCtrl.setValue(null);
  }
  isDupplication(value: string): boolean {
    if(value == '') return false;
    return !this.chooseTag.includes(value);
  }
  removeTag(tag: string): void {
    const index = this.chooseTag.indexOf(tag);
    if (index >= 0) {
      this.chooseTag.splice(index, 1);
      this.announcerTag.announce(`Removed ${tag}`);
    }
  }
  removeTopic(topic: string): void {
    const index = this.listTopic.indexOf(topic);
    if (index >= 0) {
      this.choosetopic.splice(index, 1);
      this.announcer.announce(`Removed ${topic}`);
    }
  }
  selectedTopic(event: MatAutocompleteSelectedEvent): void {
    if (this.choosetopic.length > 0) {
      this.choosetopic[0] = event.option.viewValue
    } else {
      this.choosetopic.push(event.option.viewValue);
      this.topicInput.nativeElement.value = '';
      this.topicCtrl.setValue(null);
    }
  }
  selectedTag(event: MatAutocompleteSelectedEvent): void {
    if (this.isDupplication(event.option.viewValue)) {
      this.chooseTag.push(event.option.viewValue);
      this.TagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    } 
  }
  private _filterTopic(value: string): string[] {
    const topicValue = value.toLowerCase();
    return this.listTopic.filter(fruit => fruit.toLowerCase().includes(topicValue));
  }
  private _filterTag(value: string): string[] {
    const tagValue = value.toLowerCase();
    return this.listTag.filter(fruit => fruit.toLowerCase().includes(tagValue));
  }
  GetAllTopic(){
    this.service.GetTopic().subscribe(
      (data: any) => {
        this.topics = data.resultObj;
        this.topics.forEach(element => {
          this.listTopic.push(element.title);
          this.listTag.push(element.title);
        });
      }
    )
  }
  GetAllTag(){
    this.service.GetAllTag().subscribe(
      (data: any) => {
        this.listTag = data.resultObj;
      }
    )
  }
  onFileSelected(input: any): void {
    const file = input.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result as string;
        this.updatepostform.get('Image')?.setValue(file);
      };
      reader.readAsDataURL(file);
    }
  }

  Check(){
    if(this.choosetopic.length > 0){
      const selectedTopic = this.topics.find(element => element.title === this.choosetopic[0]);
      if (selectedTopic) {
        this.updatepostform.get('TopicId')?.setValue(selectedTopic.id);
        this.updatepostform.get('TopicName')?.setValue(selectedTopic.title);
      }
    }
    const tags = this.updatepostform.get('Tag');
    if(tags) {
      tags.setValue(this.chooseTag);
    }
    if(this.updatepostform.valid)
      return true;
    return false;
  }

  UpdatePost(){
    const formData = new FormData();
    const updatepost = this.updatepostform;

    const imageValue = this.updatepostform.get('Image')?.value
    if (imageValue == this.postData.image) {
      this.updatepostform.get('Image')?.setValue(null);
    }
    
    formData.append('Id', this.postData.id || '');
    formData.append('Title', updatepost.get('Title')?.value?.trim() || '');
    formData.append('Content', updatepost.get('Content')?.value?.trim() || '');
    formData.append('Image', updatepost.get('Image')?.value || '');
    formData.append('TopicId', updatepost.get('TopicId')?.value || '');
    const tagValues = updatepost.get('Tag')?.value;
    if (Array.isArray(tagValues)) {
      tagValues.forEach((tag, index) => {
          formData.append(`Tag[${index}]`, tag);
      });
    }
    this.service.UpdatePost(formData).subscribe(
      (data: any) => {
        const postId = data.resultObj.subId;
        this.router.navigate(['/discover', postId]);
        setTimeout(() => {
          this.triggerReloadDetailPage();
        }, 0);
        this.dialogRef.close();
        this.toastr.success("Đã cập nhập bài viết");
      },
      (error: any) => {
        const message = error.error.message; 
        if(message == null){
          this.toastr.error("Lỗi kết nối đến server! Xin lỗi vì sự cố này");
        } else {
          this.toastr.error(message);
          console.log(error);
        }
      }
    )
  }
  triggerReloadDetailPage() {
    this.dataService.triggerReloadDetailPage(this.postId);
  }
}
