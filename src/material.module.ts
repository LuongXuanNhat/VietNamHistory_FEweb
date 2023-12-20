import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card'
import { MatCheckboxModule } from '@angular/material/checkbox'
import { MatButtonModule } from '@angular/material/button'
import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatMenuModule } from '@angular/material/menu';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatChipsModule } from '@angular/material/chips';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatStepperModule } from '@angular/material/stepper';
import { MatNativeDateModule,MatRippleModule } from '@angular/material/core';
import {  } from '@angular/material/form-field';

@NgModule({
    exports: [
        
        FormsModule,
        MatInputModule,
        MatSelectModule,
        MatCardModule,
        MatRadioModule,
        MatCheckboxModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatDialogModule,
        MatButtonModule,
        MatIconModule,
        MatTabsModule,
        MatMenuModule,
        MatStepperModule,
        MatGridListModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatAutocompleteModule,
        MatFormFieldModule,
        MatChipsModule,
        MatTooltipModule,
        MatProgressBarModule
        
    ],
    imports: [
        MatRippleModule,
        MatTooltipModule,
        MatButtonModule,
        MatSortModule,

      ],
})
export class MaterialModule {

}