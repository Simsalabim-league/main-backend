export interface ErrorConfig {
    message: string;
    code?: number;
    critical?: boolean;
}

export const throwApiError = (errorConfig: ErrorConfig) =>
{
    throw errorConfig
}
