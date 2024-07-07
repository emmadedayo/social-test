import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@src/services/AuthService'; // Adjust the import path as needed

class AuthController {
  private authService: AuthService;

  constructor() {
    this.authService = new AuthService();
    this.signup = this.signup.bind(this);
    this.login = this.login.bind(this);
  }

  async signup(req: Request, res: Response, next: NextFunction) {
    return this.authService.signup(req, res, next);
  }

  async login(req: Request, res: Response, next: NextFunction) {
    return this.authService.login(req, res, next);
  }
}

export default AuthController;
