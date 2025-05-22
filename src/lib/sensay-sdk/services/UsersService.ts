import type { CancelablePromise } from '../core/CancelablePromise';
import type { BaseHttpRequest } from '../core/BaseHttpRequest';

export class UsersService {
    constructor(public readonly httpRequest: BaseHttpRequest) {}

    /**
     * Get the current user
     * Returns information about the current user.
     * @param xApiVersion
     * @returns any User information
     * @throws ApiError
     */
    public getV1UsersMe(
        xApiVersion: string = '2025-03-25',
    ): CancelablePromise<{
        /**
         * The name of the user
         */
        name?: string;
        /**
         * The email address
         */
        email?: string;
        /**
         * The ID of the user
         */
        id: string;
        linkedAccounts?: Array<{
            /**
             * The account ID
             */
            accountID: string;
            /**
             * The account type
             */
            accountType: 'discord' | 'telegram' | 'embed';
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/me',
            headers: {
                'X-API-Version': xApiVersion,
            },
        });
    }

    /**
     * Create a user
     * Creates a new user.
     * @param xApiVersion
     * @param requestBody
     * @returns any The created User entity
     * @throws ApiError
     */
    public postV1Users(
        xApiVersion: string = '2025-03-25',
        requestBody?: {
            /**
             * The name of the user
             */
            name?: string;
            /**
             * The email address
             */
            email?: string;
            /**
             * The ID of the user
             */
            id?: string;
            linkedAccounts?: Array<{
                /**
                 * The account ID
                 */
                accountID: string;
                /**
                 * The account type
                 */
                accountType: 'discord' | 'telegram' | 'embed';
            }>;
        },
    ): CancelablePromise<{
        /**
         * The name of the user
         */
        name?: string;
        /**
         * The email address
         */
        email?: string;
        /**
         * The ID of the user
         */
        id: string;
        linkedAccounts?: Array<{
            /**
             * The account ID
             */
            accountID: string;
            /**
             * The account type
             */
            accountType: 'discord' | 'telegram' | 'embed';
        }>;
    }> {
        return this.httpRequest.request({
            method: 'POST',
            url: '/v1/users',
            headers: {
                'X-API-Version': xApiVersion,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                409: `User, email, or linked account already exists`,
            },
        });
    }

    /**
     * Get a user by ID
     * Returns information about the user with the specified ID.
     * @param userId
     * @param xApiVersion
     * @returns any User entity
     * @throws ApiError
     */
    public getV1Users(
        userId: string,
        xApiVersion: string = '2025-03-25',
    ): CancelablePromise<{
        /**
         * The name of the user
         */
        name?: string;
        /**
         * The email address
         */
        email?: string;
        /**
         * The ID of the user
         */
        id: string;
        linkedAccounts?: Array<{
            /**
             * The account ID
             */
            accountID: string;
            /**
             * The account type
             */
            accountType: 'discord' | 'telegram' | 'embed';
        }>;
    }> {
        return this.httpRequest.request({
            method: 'GET',
            url: '/v1/users/{userID}',
            path: {
                'userID': userId,
            },
            headers: {
                'X-API-Version': xApiVersion,
            },
            errors: {
                404: `User not found`,
            },
        });
    }
}