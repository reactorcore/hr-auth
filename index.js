"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("express-jwt");
var jwksRsa = require('jwks-rsa');
var compose = require('compose-middleware').compose;
function parseAuth0Jwt(options) {
    if (typeof options.requireRole === 'string') {
        options.requireRole = [options.requireRole];
    }
    const requireRole = options.requireRole;
    return compose([
        jwt({
            // Dynamically provide a signing key
            // based on the kid in the header and
            // the singing keys provided by the JWKS endpoint.
            secret: jwksRsa.expressJwtSecret({
                cache: true,
                rateLimit: true,
                jwksRequestsPerMinute: 5,
                jwksUri: 'https://hackreactor.auth0.com/.well-known/jwks.json'
            }),
            // Validate the audience and the issuer.
            audience: options.audience,
            issuer: 'https://hackreactor.auth0.com/',
            algorithms: ['RS256'],
            requestProperty: 'idTokenPayload',
        }),
        function (req, res, next) {
            var payload = req.idTokenPayload;
            if (payload) {
                req.apiUser = {
                    auth0_id: payload.sub,
                    roles: payload['https://my.hackreactor.com/roles'] || [],
                };
                if (requireRole) {
                    //
                    // Attempt to find a valid role
                    //
                    var found = req.apiUser.roles.find(r => requireRole.indexOf(r) >= 0);
                    if (!found) {
                        return res.status(403).send({ role_required: requireRole });
                    }
                }
            }
            next();
        }
    ]);
}
exports.default = parseAuth0Jwt;
