require("dotenv").config()
const express = require("express");
const path = require("path")
const axios = require("axios")
const app = express();

app.set('views', path.resolve(__dirname, "views"))
app.set('view engine', 'ejs')

app.get('/login', (request, response) => {
    return response.render("index.ejs", { clientId: process.env.OAUTH_CLIENT_CREDENTIALS_CLIENT_ID } );
})

app.get("/oauthcallback", async (request, response) => {
    const params = new URLSearchParams()
    params.append("grant_type", 'authorization_code')
    params.append("scope", 'identify connections guilds')
    params.append("client_id", process.env.OAUTH_CLIENT_CREDENTIALS_CLIENT_ID)
    params.append("client_secret", process.env.OAUTH_CLIENT_CREDENTIALS_SECRET_ID)
    params.append("code", request.query.code)
    params.append("redirect_uri",  process.env.OAUTH_REDIRECT_URI)

    const result = await axios.post(
        "https://discord.com/api/v10/oauth2/token",
        params,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            }
        }
    )
    const accessToken = result.data.access_token;
    let user = await axios.get(
        "https://discord.com/api/v10/users/@me",
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    );
    user = user.data;
    return response.render("welcome.ejs", { user })
})

app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`)
})