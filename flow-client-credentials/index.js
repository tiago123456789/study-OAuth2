require("dotenv").config();
const axios = require("axios");

let basicCredentials = `${process.env.OAUTH_CLIENT_CREDENTIALS_CLIENT_ID}:${process.env.OAUTH_CLIENT_CREDENTIALS_SECRET_ID}`;
basicCredentials = Buffer.from(basicCredentials).toString("base64")

const params = new URLSearchParams()
params.append("grant_type", 'client_credentials')
params.append("scope", 'identify connections guilds')

axios.post(
    "https://discord.com/api/v10/oauth2/token",
    params,
    {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${basicCredentials}`
        }
    }
)
    .then(response => {
        const accessToken = response.data.access_token;
        axios.get(
            "https://discord.com/api/v10/users/@me/guilds",
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        ).then(({ data }) => console.log(data))
    })
    .catch(console.log)
