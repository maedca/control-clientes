import {Component, OnInit} from '@angular/core';
import {ClienteService} from '../../servicios/cliente.service';
import {ClienteModel} from '../../modelo/cliente.model';
import {FlashMessagesService} from 'angular2-flash-messages';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  clientes: ClienteModel[];
  cliente: ClienteModel = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0

  };

  constructor(private clientesService: ClienteService, private flashMessages: FlashMessagesService) {
  }

  ngOnInit() {
    this.clientesService.getClientes().subscribe(clientes => {
        this.clientes = clientes;
      }
    )
    ;
  }

  getSaldoTotal() {
    let saldoTotal = 0;
    if (this.clientes) {
      this.clientes.forEach(cliente => {
        saldoTotal += cliente.saldo;
      });
    }
    return saldoTotal;

  }

  agregar({value, valid}: { value: ClienteModel, valid: boolean }) {
    if (!valid) {
        this.flashMessages.show('Llena el formulario correctamente', {
          cssClass: 'alert-danger',
          timeout: 4000,

        });
    }
  }

}
