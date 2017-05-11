/// <reference path="typings/express.d.ts" />
export interface AuthOptions {
    audience: string;
    requireRole?: string | string[];
}
export default function parseAuth0Jwt(options: AuthOptions): any;
