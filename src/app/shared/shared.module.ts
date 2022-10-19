import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//modulos
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//rutas
import { SharedRoutingModule } from './shared-routing.module';

// componentes
import { ChatComponent } from './chat/chat.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AboutComponent } from './about/about.component';
import { FooterComponent } from './footer/footer.component';

//services or providers
import { ChatService } from './providers/chat.service';
import { LoginService } from './providers/login.service';
import { InteractionService } from './providers/interaction.service';
import { UsersService } from './providers/users.service';


//Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatGridListModule } from '@angular/material/grid-list';


@NgModule({
  declarations: [
    ChatComponent,
    NavbarComponent,
    AboutComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    MatIconModule,
    SharedRoutingModule,
    MatBottomSheetModule,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ChatComponent,
    NavbarComponent,
    AboutComponent,
    MatIconModule,
    SharedRoutingModule,
    MatBottomSheetModule,
    FooterComponent,
    MatProgressBarModule,
    MatTableModule,
    MatSortModule,
    MatGridListModule
  ],
  providers: [
    ChatService,
    LoginService,
    UsersService,
    InteractionService
  ]
})
export class SharedModule { }
