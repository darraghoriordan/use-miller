/* eslint-disable @typescript-eslint/naming-convention */
export default class LocalApiTestToken {
    constructor(part?: Partial<LocalApiTestToken>) {
        this.access_token = part?.access_token;
        this.date_received = part?.date_received
            ? new Date(part?.date_received)
            : new Date(2019, 1, 1);
        this.expires_in = part?.expires_in || 1;
        this.token_type = part?.token_type || "Bearer";
    }
    public access_token?: string;
    public expires_in: number;
    public token_type: string;
    public date_received: Date;

    public mustRefreshToken(): boolean {
        const noExistingAccessToken = this.access_token === undefined;
        // now - date received / 1000 > expires in
        const yesterday = new Date(Date.now() - 24 * 3600 * 1000);
        const existingIsExpired = yesterday > this.date_received;

        const overallNeedNewToken = noExistingAccessToken || existingIsExpired;

        if (overallNeedNewToken) {
            console.log("Need new auth token test result", {
                overallNeedNewToken,
                existingIsExpired,
                noExistingAccessToken,
            });
        }
        return overallNeedNewToken;
    }
}
