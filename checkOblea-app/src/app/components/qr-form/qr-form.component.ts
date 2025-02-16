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
  escaneando: boolean = false;
  modoManual: boolean = false; // Variable para determinar si se ingresa manualmente el QR

  constructor(private fb: FormBuilder, private socketService: SocketService) { }

  ngOnInit(): void {
    this.qrForm = this.fb.group({
      patente: [''],
      oblea: ['']
    });
  }

  // Se ejecuta cuando el escáner detecta un código QR
  onScanSuccess(result: string) {
    // Solo actualizamos si no estamos en modo manual
    if (!this.modoManual) {
      this.qrForm.patchValue({ oblea: result });
      this.escaneando = false;
    }
  }

  // Envía los datos al servidor
  enviarDatos() {
    if (this.qrForm.valid) {
      this.socketService.enviarRegistro(this.qrForm.value);
      this.qrForm.reset();
      // Al enviar, se restablece el modo manual (opcional)
      this.modoManual = false;
    }
  }

  // Activa el escáner QR
  activarEscaner() {
    this.escaneando = true;
  }

  // Alterna entre modo manual y modo escáner
  toggleModoManual() {
    this.modoManual = !this.modoManual;
    // Si se activa el modo manual, se oculta el escáner
    if (this.modoManual) {
      this.escaneando = false;
    }
  }
}
