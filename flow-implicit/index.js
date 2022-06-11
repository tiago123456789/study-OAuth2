require("dotenv").config()
const express = require("express");
const path = require("path")
const app = express();

app.set('views', path.resolve(__dirname, "views"))
app.set('view engine', 'ejs')

app.get('/login', (request, response) => {
    return response.render("index.ejs", { clientId: process.env.OAUTH_CLIENT_CREDENTIALS_CLIENT_ID });
})

app.get("/oauthcallback", (request, response) => {
    return response.render("afterAuth.ejs")
})

app.listen(3000, () => {
    console.log(`Server is running http://localhost:3000`)
})