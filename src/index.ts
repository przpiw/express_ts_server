import bodyParser from 'body-parser';
import express from 'express'
import cookieSession from 'cookie-session';
import './controllers/LoginController'
import './controllers/RootController'
import { AppRouter } from './AppRouter';
const app = express();


app.use(express.urlencoded()); //Parse URL-encoded bodies
app.use(express.json())
app.use(cookieSession({ keys: ['mykey'] }))
app.use(AppRouter.getInstance())

app.listen(3000, () => {
  console.log('listening on 3000')
})