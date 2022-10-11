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
    MatBottomSheetModule
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
    FooterComponent
  ],
  providers: [
    ChatService,
    LoginService,
    InteractionService
  ]
})
export class SharedModule { }
