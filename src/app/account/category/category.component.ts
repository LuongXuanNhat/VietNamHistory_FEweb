import { Component } from '@angular/core';
import { Category } from 'src/app/ObjectClass/Category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  objectList: Category[] = [
    { categoryname: 'Thông tin cá nhân', url: '/account/updateuserinfor' },
    { categoryname: 'Cập nhập tài khoản', url: '/learn' },
    
  ];
}
