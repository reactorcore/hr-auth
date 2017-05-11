//
// Extend request object typings with data this lib will populate with
//
declare namespace Express {
  export interface Request {
    apiUser?: ApiUser,
    idTokenPayload?: IdTokenPayload
  }
}

type ApiUser = {
  auth0_id: string,
  roles: string[],
}
type IdTokenPayload = {
  name: string,
  picture: string,
  iss: string,
  sub: string,
  aud: string,
  exp: number,
  iat: number,
  'https://my.hackreactor.com/roles'?: string[]
}
