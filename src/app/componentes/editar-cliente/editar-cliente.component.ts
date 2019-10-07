import {Component, OnInit} from '@angular/core';
import {ClienteModel} from "../../modelo/cliente.model";
import {ClienteService} from "../../servicios/cliente.service";
import {FlashMessagesService} from "angular2-flash-messages";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent implements OnInit {
  cliente: ClienteModel = {
    nombre: '',
    apellido: '',
    email: '',
    saldo: 0
  };

  id: string;

  constructor(private clienteService: ClienteService,
              private flashMessages: FlashMessagesService,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clienteService.getCliente(this.id).subscribe(cliente => {
      this.cliente = cliente;
    });
  }

  guardar({value, valid}: { value: ClienteModel, valid: boolean }) {
    if (!valid) {
      this.flashMessages.show('llenar el formulario correctament', {
        cssClass: 'alert-danger',
        timeout: 4000,
      });
    } else {
      value.id = this.id;
      //modificamos el cliente
      this.clienteService.modificarCliente(value);
      this.router.navigate(['/']);
    }
  }

  eliminar() {
    if (confirm('seguro que desea eliminar el cliente')) {
      this.clienteService.eliminarCliente(this.cliente);
      this.router.navigate(['/']);
    }
  }

}
