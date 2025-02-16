// src/app/services/socket.service.ts
import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  private socket: Socket;
  private readonly SERVER_URL = 'http://localhost:3000'; // Asegúrate de que este URL coincida con tu servidor Node.js

  constructor() {
    this.socket = io(this.SERVER_URL);
  }

  // Enviar registro al servidor
  enviarRegistro(registro: any) {
    this.socket.emit('nuevo-registro', registro);
  }

  // Escuchar eventos emitidos por el servidor
  escucharEvento(evento: string): Observable<any> {
    return new Observable<any>(observer => {
      this.socket.on(evento, (data) => {
        observer.next(data);
      });
    });
  }
}
