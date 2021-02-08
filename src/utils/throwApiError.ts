export interface IApiError {
    message: string;
    code?: number;
    details?: string;
    critical?: boolean;
}

export class ApiError extends Error implements IApiError
{
    code?: number;
    details?: string;
    critical?: boolean;
    constructor(config: IApiError)
    {
        super(config.message)

        this.name = 'ApiError'
        Object.assign(this, config)
        Object.setPrototypeOf(this, ApiError.prototype)
    }
}

export const throwApiError = (errorConfig: IApiError) =>
{
    throw new ApiError(errorConfig)
}
