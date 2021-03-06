import {Injectable} from "@angular/core";
import {AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from "@angular/fire/firestore";
import {ClienteModel} from "../modelo/cliente.model";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";

@Injectable()
export class ClienteService {
  clientesColleccion: AngularFirestoreCollection<ClienteModel>;
  clienteDoc: AngularFirestoreDocument<ClienteModel>;

  clientes: Observable<ClienteModel[]>;//regresa una coleccion
  cliente: Observable<ClienteModel>;//regresa un unico cliente

  constructor(private db: AngularFirestore) {
    this.clientesColleccion = db.collection('clientes', ref => ref.orderBy('nombre', 'asc'));
  }

  getClientes(): Observable<ClienteModel[]> {
    this.clientes = this.clientesColleccion.snapshotChanges().pipe(
      map(cambios => {
        return cambios.map(accion => {
          const datos = accion.payload.doc.data() as ClienteModel;
          datos.id = accion.payload.doc.id;
          return datos;
        });
      })
    );
    return this.clientes;
  }

  getCliente(id: string) {
    this.clienteDoc = this.db.doc<ClienteModel>(`clientes/${id}`);
    this.cliente = this.clienteDoc.snapshotChanges().pipe(
      map(accion => {
        if (accion.payload.exists === false) {
          return null;
        } else {
          const datos = accion.payload.data() as ClienteModel;
          datos.id = accion.payload.id;
          return datos;
        }
      })
    );
    return this.cliente;
  }

  agregarCliente(cliente: ClienteModel) {
    this.clientesColleccion.add(cliente);
  }

  modificarCliente(cliente: ClienteModel) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.update(cliente);
  }

  eliminarCliente(cliente: ClienteModel) {
    this.clienteDoc = this.db.doc(`clientes/${cliente.id}`);
    this.clienteDoc.delete();
  }

}
