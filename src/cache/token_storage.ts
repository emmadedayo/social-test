import redisClient from './redis';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { IUser } from '@src/interfaces/UserInterface';
import { TokenType } from '@src/enum/LoginEnum';

interface TokenStorageInterface {
  emailVerificationExpiresToken?: string;
  emailVerificationToken?: string;
  resetPasswordExpires?: string;
  resetPasswordToken?: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;
}

class TokenStorage implements TokenStorageInterface {
  emailVerificationExpiresToken?: string;
  emailVerificationToken?: string;
  resetPasswordExpires?: string;
  resetPasswordToken?: string;
  userId: string;
  accessToken?: string;
  refreshToken?: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  async generatePasswordReset(): Promise<void> {
    this.resetPasswordToken = crypto.randomBytes(32).toString('hex');
    this.resetPasswordExpires = new Date(Date.now() + 3600000).toISOString(); // expires in an hour
    await redisClient.save(
      `resetPassword:${this.userId}`,
      JSON.stringify({
        resetPasswordToken: this.resetPasswordToken,
        resetPasswordExpires: this.resetPasswordExpires,
      }),
      3600
    );
  }

  async generateEmailVerificationToken(): Promise<void> {
    this.emailVerificationToken = crypto.randomBytes(32).toString('hex');
    this.emailVerificationExpiresToken = new Date(Date.now() + 3600000).toISOString(); // expires in an hour
    await redisClient.save(
      `emailVerification:${this.userId}`,
      JSON.stringify({
        emailVerificationToken: this.emailVerificationToken,
        emailVerificationExpiresToken: this.emailVerificationExpiresToken,
      }),
      3600
    );
  }

  async generateToken(payload: { user: IUser & Document }, secret: string, signOptions: any): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      jwt.sign(payload, secret, signOptions, (err, encoded) => {
        if (err) {
          reject(err);
        } else {
          resolve(encoded!);
        }
      });
    });
  }

  async getToken(userId: string, tokenType: TokenType): Promise<string | null> {
    return await redisClient.get(`${tokenType}:${userId}`);
  }

  async deleteToken(userId: string, tokenType: TokenType): Promise<void> {
    await redisClient.delete(`${tokenType}:${userId}`);
  }

  async saveToken(userId: string, tokenType: TokenType, tokenData: any): Promise<void> {
    await redisClient.save(`${tokenType}:${userId}`, tokenData, 3600);
  }
}

export default TokenStorage;
