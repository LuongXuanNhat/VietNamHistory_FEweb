import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/ObjectClass/object';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent {
  objectList: Category[] = [
    { categoryname: 'Thông tin cá nhân', url: 'updateuserinfor' },
    { categoryname: 'Cập nhập tài khoản', url: 'updateaccount' },
    
  ];
  defaultLink = this.objectList[0].url;
  constructor(private router: Router){

  }

}
