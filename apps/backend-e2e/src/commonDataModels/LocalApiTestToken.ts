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

    public needNewToken(): boolean {
        const noAccessToken = this.access_token === undefined;
        // now - date received / 1000 > expires in
        const yesterday = new Date(Date.now() - 24 * 3600 * 1000);
        const expired = yesterday > this.date_received;

        const needNewToken = noAccessToken || expired;

        console.log(JSON.stringify({ needNewToken, expired, noAccessToken }));
        return needNewToken;
    }
}
