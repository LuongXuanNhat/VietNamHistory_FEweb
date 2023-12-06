import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { AuthService } from './service/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InjectionToken } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { AnimationService } from './service/animations/animation.service';
import { SessionService } from './service/session/session.service';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { FooterComponent } from './home/footer/footer.component';

describe('AppComponent', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [ToastrModule.forRoot(),RouterTestingModule, HttpClientTestingModule, MatDialogModule,
    MatIconModule, MatMenuModule, MatTooltipModule, RouterModule],
    declarations: [AppComponent, FooterComponent],
    providers: [AuthService,{ provide: MatDialogRef, useValue: {} }, AnimationService, SessionService]
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'VietNamHistory'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('VietNamHistory');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.content span')?.textContent).toContain('VietNamHistory app is running!');
  });
});
