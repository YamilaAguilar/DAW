import { ClientesService } from './clientes.service';
export declare class ClientesController {
    private readonly clientesService;
    constructor(clientesService: ClientesService);
    findAll(): {
        id: number;
        nombre: string;
        estado: string;
    }[];
    create(body: any): {
        message: string;
        data: any;
    };
}
