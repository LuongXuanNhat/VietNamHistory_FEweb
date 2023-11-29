import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { DataService } from '../service/datashare/data.service';
import { PublicserviceService } from '../service/publicservice.service';
import { SessionService } from '../service/session/session.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  constructor(private router: Router, private service: PublicserviceService, private dataService: DataService,
    private session: SessionService, private toastr: ToastrService) {
    
    
  }

  
}
