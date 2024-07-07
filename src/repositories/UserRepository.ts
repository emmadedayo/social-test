import { IUser } from '@src/interfaces/UserInterface';
import { BaseRepository } from '@src/repositories/BaseRepository';
import UserModel from '@src/model/User.Model';

class UserRepository extends BaseRepository<IUser & Document> {
  constructor() {
    super(UserModel);
  }

  /**
   * Create a new user
   */
  async createUser(user: Partial<IUser>): Promise<IUser> {
    return this.create(user as Partial<IUser & Document>);
  }

  async getUserByEmail(email: String, exclude: any[] = []) {
    return this.findOne({ email }, exclude);
  }

  async genericFindOne(query: any, projection: any) {
    return this.findOne(query, projection);
  }

  async findUserById(userId: any) {
    return this.findById(userId);
  }
}
export default UserRepository;
