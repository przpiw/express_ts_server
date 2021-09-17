import { NextFunction, Request, Response } from "express";
import { get, post, controller, use, bodyValidator } from "./decorators"



function logger(req: Request, res: Response, next: NextFunction) {
  next();
}
@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    console.log('entered')
    res.send(`
    <form type="submit" method="POST" id="form">
      <div>
        <label>Email</label>
        <input name="email"/>
        <label>Password</label>
        <input name="password"/>
        
      </div>
  
    </form>
    <button type="submit" form="form" value="Submit">Submit</button>
  `
    )
  }

  @post('/login')
  @bodyValidator('email', 'password')
  postLogin(req: Request, res: Response) {
    const { email, password } = req.body;

    if (email && password) {
      req.session = { loggedIn: true }
      res.redirect('/')
    }
    else {
      res.send('Must provide email')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response) {
    req.session = undefined;
    res.redirect('/')
  }
}