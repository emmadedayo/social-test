import bcrypt from 'bcrypt';
import UserRepository from '@src/repositories/UserRepository';
import { NextFunction, Request, Response } from 'express';
import ResponseT from '@src/interfaces/Response';
import { response } from '@src/utils';
import TokenStorage from '@src/cache/token_storage';
import { environmentConfig } from '@src/configs';
import { TokenType } from '@src/enum/LoginEnum';
import { CreateUserInput, LoginUserInput } from '@src/dto/signup-dto';

export class AuthService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  async signup(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const user = req.body as CreateUserInput;
    //check if user already exists
    const existingUser = await this.userRepository.genericFindOne({username:user.username}, []);
    if (existingUser) {
      return res.status(409).json(
        response<any>({
          data: null,
          success: false,
          message: 'User already exists',
          status: 409,
        })
      );
    }
    //check if email already exists
    const existingEmail = await this.userRepository.genericFindOne({email:user.email}, []);
    if (existingEmail) {
      return res.status(409).json(
        response<any>({
          data: null,
          success: false,
          message: 'Email already exists',
          status: 409,
        })
      );
    }
    user.password = await bcrypt.hash(user.password, 10);
    await this.userRepository.createUser(user);
    return res.status(201).json(
      response<any>({
        data: null,
        success: true,
        message: 'User created successfully',
        status: 201,
      })
    );
  }

  async login(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const dto = req.body as LoginUserInput;
    const userCheck = await this.userRepository.getUserByEmail(dto.email, []);
    if (!userCheck) {
      return res.status(404).json(
        response<any>({
          data: null,
          success: false,
          message: 'User not found',
          status: 404,
        })
      );
    }
    const isPasswordValid = await bcrypt.compare(dto.password, userCheck.password!);
    if (!isPasswordValid) {
      return res.status(401).json(
        response<any>({
          data: null,
          success: false,
          message: 'Invalid credentials',
          status: 401,
        })
      );
    }
    //delete password from user object
    const user = await this.userRepository.getUserByEmail(dto.email, ['password']);
    const tokenModel = new TokenStorage(user!._id);
    const token = await tokenModel.generateToken({ user: user! }, environmentConfig.JWT_TOKEN_SECRET!, {
      expiresIn: '24h',
    });
    await tokenModel.saveToken(user!._id, TokenType.LOGIN, token);
    await tokenModel.getToken(user!._id, TokenType.LOGIN);
    return res.status(200).json(
      response<any>({
        data: { token: token, user: user },
        success: true,
        message: 'Login successful',
        status: 200,
      })
    );
  }
}
