export declare class GetRequest {
    private baseUrl;
    private path;
    private jsonFormat;
    constructor(_baseUrl: string, _path: string, _jsonFormat: []);
    get(): Promise<any>;
}
