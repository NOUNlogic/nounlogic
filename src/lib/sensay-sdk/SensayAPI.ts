import { FetchHttpRequest } from './core/FetchHttpRequest';
import type { BaseHttpRequest } from './core/BaseHttpRequest';
import type { OpenAPIConfig } from './core/OpenAPI';
import { ChatCompletionsService } from './services/ChatCompletionsService';
import { ReplicasService } from './services/ReplicasService';
import { UsersService } from './services/UsersService';

type HttpRequestConstructor = new (config: OpenAPIConfig) => BaseHttpRequest;

export class SensayAPI {
    public readonly chatCompletions: ChatCompletionsService;
    public readonly replicas: ReplicasService;
    public readonly users: UsersService;
    public readonly request: BaseHttpRequest;

    constructor(config?: Partial<OpenAPIConfig>, HttpRequest: HttpRequestConstructor = FetchHttpRequest) {
        this.request = new HttpRequest({
            BASE: config?.BASE ?? 'https://api.sensay.io',
            VERSION: config?.VERSION ?? '2025-03-25',
            WITH_CREDENTIALS: config?.WITH_CREDENTIALS ?? false,
            CREDENTIALS: config?.CREDENTIALS ?? 'include',
            TOKEN: config?.TOKEN,
            USERNAME: config?.USERNAME,
            PASSWORD: config?.PASSWORD,
            HEADERS: config?.HEADERS,
            ENCODE_PATH: config?.ENCODE_PATH,
        });
        this.chatCompletions = new ChatCompletionsService(this.request);
        this.replicas = new ReplicasService(this.request);
        this.users = new UsersService(this.request);
    }
}