import { IUser } from '@src/interfaces/UserInterface';
import { BaseRepository } from '@src/repositories/BaseRepository';
import LikeModel from '@src/model/Like.Model';
import { ILike } from '@src/interfaces/LikeInterface';

class LikeRepository extends BaseRepository<ILike & Document> {
  constructor() {
    super(LikeModel);
  }

  /**
   * Create a new user
   */
  async createLike(data: Partial<ILike>): Promise<ILike> {
    return this.create(data as Partial<ILike & Document>);
  }

  async deleteLike(id: string) {
    return this.deleteById(id);
  }
}
export default LikeRepository;
