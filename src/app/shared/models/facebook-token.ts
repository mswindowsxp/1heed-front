export interface AuthResponse {
    accessToken: string;
    data_access_expiration_time?: number;
    expiresIn: number;
    reauthorize_required_in?: number;
    signedRequest?: string;
    userID: string;
}

export interface FacebookResponse {
    authResponse: AuthResponse;
    status: string;
}
