// src/app/components/tabla/tabla.component.ts
import { Component, OnInit } from '@angular/core';
import { SocketService } from '../../services/socket.service';


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {
  registros: any[] = [];
  // Columnas a mostrar en la tabla
  displayedColumns: string[] = ['patente', 'oblea'];

  constructor(private socketService: SocketService) { }

  ngOnInit(): void {
    // Escuchar el evento para cargar datos iniciales
    this.socketService.escucharEvento('cargar-datos').subscribe((datos: any) => {
      this.registros = datos;
    });

    // Escuchar actualizaciones de la tabla
    this.socketService.escucharEvento('actualizar-tabla').subscribe((datos: any) => {
      this.registros = datos;
    });
  }
}
