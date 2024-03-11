# Build a REST API with Node.js, Mongoose & TypeScript

This is Node Js server with typescript, Rest API using express an middleware and mongoose as ODM with mongoDB and for validation we are zod.ALso have implemented google-Oauth and Express APIs Metrics using prometheus
This is made using yarn as an package manager so make sure you have yarn installed.Feel free to use npm if you want

## Frontend Repo

The API is fully functional, and you can find the corresponding frontend on GitHub at `https://github.com/vbvsingh29/node-zod-ui`. Additionally, it offers the convenience of logging in via Google OAuth, as this feature has been implemented within the project.

## Technologies

- Node.js
- MongoDB with Mongoose
- TypeScript
- Express.js & Express.js middleware
- Zod validation

## ENV Secrets

| Variable                   | Description                                                 |
| -------------------------- | ----------------------------------------------------------- |
| `PORT`                     | The port on which the Node server should listen.            |
| `DATABASE_URL`             | MongoDB Database URL (Local or Remote) : NUMBER             |
| `SALTWORKFACTOR`           | number to genereate salt for more secure password. : NUMBER |
| `ACCESSTOKENTTL`           | Access Token Expiry Time. : STRING                          |
| `REFERSHTOKENTTL`          | Refresh Token Expiry Time. : STRING                         |
| `ACCESS_TOKEN_PUBLIC_KEY`  | Public Key.                                                 |
| `ACCESS_TOKEN_PRIVATE_KEY` | Private Key.                                                |
| `REFRESH_PUBLIC_KEY`       | Public Key.                                                 |
| `REFRESH_PRIVATE_KEY`      | Private Key                                                 |
| `GOOGLE_CLIENT_ID`         | Google Client Id                                            |
| `GOOGLE_CLIENT_SECRET`     | Google Client Secret                                        |
| `GOOGLE_AUTH_REDIRECT_URL` | Google Auth Redirect URL                                    |

## DATA FLOW

![](./flow-diagrams/flow.png)

## Access & refresh token flow

![](./flow-diagrams/refresh-token-flow.png)

## Google Oauth used

## How To Run

- Install all dependicies
  `yarn`
- Run the program
  `yarn dev`
