export declare class ClientesService {
    create(cliente: any): {
        message: string;
        data: any;
    };
    findAll(): {
        id: number;
        nombre: string;
        estado: string;
    }[];
}
