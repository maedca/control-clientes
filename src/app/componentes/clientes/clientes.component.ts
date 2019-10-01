import {Component, OnInit} from '@angular/core';
import {ClienteService} from "../../servicios/cliente.service";
import {ClienteModel} from "../../modelo/cliente.model";

@Component({
    selector: 'app-clientes',
    templateUrl: './clientes.component.html',
    styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
    clientes: ClienteModel[];

    constructor(private clientesService: ClienteService) {
    }

    ngOnInit() {
        this.clientesService.getClientes().subscribe(clientes => {
                this.clientes = clientes;
            }
        )
        ;
    }

    getSaldoTotal() {
        let saldoTotal: number = 0;
        if (this.clientes) {
            this.clientes.forEach(cliente => {
                    saldoTotal += cliente.saldo;
            });
        }
        return saldoTotal;

    }

}
