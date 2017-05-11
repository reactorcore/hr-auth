# Hack Reactor Auth Express

This library contains the logic and convention to accept and parse signed Auth0 tokens.

## Getting Started

    $ yarn add hr-auth-express

If you're building an API, you probably want to include CORS as well:

```js
import { Router } from 'express'
import hrAuth from 'hr-auth-express'
import cors = require('cors')

var router = Router()

router.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    preflightContinue: false,
    allowedHeaders: ['Authorization']
  })
)

router.use( hrAuth({
  audience: process.env.AUTH0_AUDIENCE,
  requireRole: 'staff', // <-- This is optional
}) )

router.get('/', function (req, res) {
  req.apiUser.auth0_id // string
  req.apiUser.roles    // Array<string>
})
```
