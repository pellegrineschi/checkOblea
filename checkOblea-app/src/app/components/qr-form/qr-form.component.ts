// src/app/components/qr-form/qr-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SocketService } from '../../services/socket.service';


@Component({
  selector: 'app-qr-form',
  templateUrl: './qr-form.component.html',
  styleUrls: ['./qr-form.component.scss']
})
export class QrFormComponent implements OnInit {
  qrForm!: FormGroup;
  // Bandera para mostrar el escáner
  escaneando: boolean = false;

  constructor(private fb: FormBuilder, private socketService: SocketService) { }

  ngOnInit(): void {
    // Inicializar el formulario con dos campos: patente y oblea
    this.qrForm = this.fb.group({
      patente: [''],
      oblea: ['']
    });
  }

  // Método que se dispara cuando el escáner QR obtiene un resultado
  onScanSuccess(result: string) {
    this.qrForm.patchValue({ oblea: result });
    this.escaneando = false;
  }

  // Enviar el formulario al servidor vía Socket.IO
  enviarDatos() {
    if (this.qrForm.valid) {
      this.socketService.enviarRegistro(this.qrForm.value);
      // Opcional: limpiar el formulario o mostrar una notificación
      this.qrForm.reset();
    }
  }

  // Método para activar el escáner
  activarEscaner() {
    this.escaneando = true;
  }
}
