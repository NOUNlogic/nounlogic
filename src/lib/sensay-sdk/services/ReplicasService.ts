import type { replicaUUID_parameter } from '../models/replicaUUID_parameter';
import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class ReplicasService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * List replicas
     * List replicas with pagination with optional filtering. Only Replicas that are public or belong to the authenticated user are returned.
     * @param pageIndex Pagination: The page index to return
     * @param pageSize Pagination: The number of items per page
     * @param xApiVersion
     * @returns any List of Replicas
     * @throws ApiError
     */
    public getV1Replicas(
        pageIndex: number = 1,
        pageSize: number = 24,
        xApiVersion: string = '2025-03-25',
    ): CancelablePromise<{
        /**
         * Indicates the status of the request
         */
        success: boolean;
        type: string;
        /**
         * Array of replica items for the current page. Will be an empty array if no items exist.
         */
        items: Array<{
            /**
             * The name of the replica.
             */
            name: string;
            /**
             * A short description of your replica's purpose or personality.
             */
            shortDescription: string;
            /**
             * The first thing your replica will say when you start a conversation with them.
             */
            greeting: string;
            /**
             * The replica type.
             */
            type?: 'individual' | 'character' | 'brand';
            /**
             * The replica owner ID.
             */
            ownerID: string;
            /**
             * Visibility of the replica.
             */
            private?: boolean;
            /**
             * The slug of the replica.
             */
            slug: string;
            tags?: Array<string>;
            profileImage?: string;
            suggestedQuestions?: Array<string>;
            llm: {
                model?: string;
                memoryMode?: 'prompt-caching' | 'rag-search';
                systemMessage?: string;
                tools?: Array<string>;
            };
            uuid: string;
        }>;
        total: number;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/replicas',
            query: {
                'pageIndex': pageIndex,
                'pageSize': pageSize,
            },
            headers: {
                'X-API-Version': xApiVersion,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                415: `Unsupported Media Type`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Create a replica
     * Creates a new replica.
     * @param xApiVersion
     * @param requestBody
     * @returns any The created replica
     * @throws ApiError
     */
    public postV1Replicas(
        xApiVersion: string = '2025-03-25',
        requestBody?: {
            name: string;
            shortDescription: string;
            greeting: string;
            type?: 'individual' | 'character' | 'brand';
            ownerID: string;
            private?: boolean;
            slug: string;
            tags?: Array<string>;
            profileImage?: string;
            suggestedQuestions?: Array<string>;
            llm: {
                model?: string;
                memoryMode?: 'prompt-caching' | 'rag-search';
                systemMessage?: string;
                tools?: Array<string>;
            };
        },
    ): CancelablePromise<{
        success: boolean;
        uuid: string;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/replicas',
            headers: {
                'X-API-Version': xApiVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                415: `Unsupported Media Type`,
                500: `Internal Server Error`,
            },
        });
    }

    /**
     * Get a replica
     * Get an existing replica.
     * @param replicaUuid
     * @param xApiVersion
     * @returns any The requested replica
     * @throws ApiError
     */
    public getV1Replicas1(
        replicaUuid: replicaUUID_parameter,
        xApiVersion: string = '2025-03-25',
    ): CancelablePromise<{
        name: string;
        shortDescription: string;
        greeting: string;
        type?: 'individual' | 'character' | 'brand';
        ownerID: string;
        private?: boolean;
        slug: string;
        tags?: Array<string>;
        profileImage?: string;
        suggestedQuestions?: Array<string>;
        llm: {
            model?: string;
            memoryMode?: 'prompt-caching' | 'rag-search';
            systemMessage?: string;
            tools?: Array<string>;
        };
        uuid: string;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/replicas/{replicaUUID}',
            path: {
                'replicaUUID': replicaUuid,
            },
            headers: {
                'X-API-Version': xApiVersion,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                415: `Unsupported Media Type`,
                500: `Internal Server Error`,
            },
        });
    }
}