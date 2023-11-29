import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { Component,ViewChild, inject, ElementRef } from '@angular/core';
import { FormControl,FormBuilder, Validators } from '@angular/forms';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CreatePostRequest, Topic } from 'src/app/ObjectClass/object';
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
  selector: 'app-forum-create',
  templateUrl: './forum-create.component.html',
  styleUrls: ['./forum-create.component.css'] 
})
export class ForumCreateComponent {
  postId: string = '';
  
  createquestionform = this._formBuilder.group({
    Title: ['', [Validators.required, Validators.maxLength(255)]],
    Content: ['<br><br><br><br>', Validators.required],
    Tag: [[] as string[]]
  });
  currentDate = this.service.getCurrentDate();
  isEditable = true;
  public Editor = ClassicEditor;
  topicCtrl = new FormControl('');
  announcer = inject(LiveAnnouncer);

  listTag: string[] = [];
  chooseTag: string[] = [];
  tagCtrl = new FormControl('');
  filteredTags : Observable<string[]>;
  announcerTag = inject(LiveAnnouncer);
  separatorKeysCodesTag: number[] = [ENTER, COMMA];
  @ViewChild('TagInput') TagInput!: ElementRef<HTMLInputElement>;

  public editorConfig = {
    toolbar: ['undo','redo', '|','heading', '|', 'bold', 'italic','bulletedList', 'numberedList', 'link','insertTable','blockQuote','mediaEmbed',],
    placeholder: 'Miêu tả thêm ở đây... (không bắt buộc)',
    language: 'vi',
  };
  onEditorChange( { editor }: ChangeEvent )  {
    // const data = editor.getData();
    // this.createpostform.get('Content')?.setValue(data);
  }

  constructor(private _formBuilder: FormBuilder, public service: PublicserviceService,
    private router: Router, private  toastr: ToastrService, private dialogRef: MatDialogRef<ForumCreateComponent>,
    private dataService: DataService) {

    this.GetAllTag();
    this.filteredTags = this.tagCtrl.valueChanges.pipe(
      startWith(null),
      map((topic: string | null) => (topic ? this._filterTag(topic) : this.listTag.slice())),
    );
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
  selectedTag(event: MatAutocompleteSelectedEvent): void {
    if (this.isDupplication(event.option.viewValue)) {
      this.chooseTag.push(event.option.viewValue);
      this.TagInput.nativeElement.value = '';
      this.tagCtrl.setValue(null);
    } 
  }

  private _filterTag(value: string): string[] {
    const tagValue = value.toLowerCase();
    return this.listTag.filter(fruit => fruit.toLowerCase().includes(tagValue));
  }
  GetAllTag(){
    this.service.GetAllTag().subscribe(
      (data: any) => {
        this.listTag = data.resultObj;
      }
    )
  }

  Check(){
    const tags = this.createquestionform.get('Tag');
    if(tags) {
      tags.setValue(this.chooseTag);
    }
    
    if(this.createquestionform.valid)
      return true;
    return false;
  }

  CreatePost(){
    const formData = new FormData();
    const createpost = this.createquestionform;
  
    formData.append('Title', createpost.get('Title')?.value?.trim() || '');
    formData.append('Content', createpost.get('Content')?.value?.trim() || '');
    const tagValues = createpost.get('Tag')?.value;
    if (Array.isArray(tagValues)) {
      tagValues.forEach((tag, index) => {
          formData.append(`Tag[${index}]`, tag);
      });
    }
    
    this.service.CreateQuestion(formData).subscribe(
      (data: any) => {
        const id = data.resultObj.subId;
        this.dataService.changeIdQuestion(data.resultObj.id);
        this.router.navigate(['/forum', id]);
        setTimeout(() => {
          this.triggerReloadDetailPage();
        }, 10);
        this.dialogRef.close();
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
