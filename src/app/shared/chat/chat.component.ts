import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// providers
import { LoginService } from 'src/app/shared/providers/login.service';
import { ChatService } from '../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: [
  ]
})
export class ChatComponent implements OnInit {

  formularioDeChat: FormGroup;
  loading = false;
  elemento: any;
  usuario: any = {};

  constructor(
    public formulario: FormBuilder,
    public _cs: ChatService,
    public _lc: LoginService
  ) {
    //input de msj
    this.formularioDeChat = this.formulario.group({
      mensaje: ['', Validators.required]
    });
    //msj de la BD firebase
    this._lc.auth.authState.subscribe(user => {
      if (!user) {
        return;
      }
      this._cs.cargarMsj().subscribe(() => {
        setTimeout(() => {
          this.elemento.scrollTop = this.elemento.scrollHeight;
        }, 20);
      });
    });

  }

  ngOnInit(): void {
    this.elemento = document.getElementById('app-mensajes');
  }

  enviar_mensaje(): any {
    if (this.formularioDeChat.invalid) {
      return;
    }
    this._cs.agregarMsj(this.formularioDeChat.value.mensaje)
      .then((response) => {
        this.formularioDeChat.reset()
      }).catch((error) => {
        console.log('Error al enviar', error);
      });
  }

  toastShow() {
    this.loading = true;
  }

}
