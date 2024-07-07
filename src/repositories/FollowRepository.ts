import { BaseRepository } from '@src/repositories/BaseRepository';
import { IPost } from '@src/interfaces/PostInterface';
import { IFollow } from '@src/interfaces/FollowInterface';
import FollowModel from '@src/model/Follow.Model';

class FollowRepository extends BaseRepository<IFollow & Document> {
  constructor() {
    super(FollowModel);
  }

  async createFollow(data: Partial<IFollow>): Promise<IFollow> {
    return this.create(data as Partial<IFollow & Document>);
  }

  async deleteFollow(followId: string) {
    return this.deleteById(followId);
  }

  async findFollowById(followId: string, []) {
    return this.findOne({ _id: followId }, []);
  }

  async updateFollow(followId: string, data: Partial<IFollow>): Promise<(IFollow & Document) | null> {
    return this.updateById(followId, data as Partial<IFollow & Document>);
  }

  // async getFollows(query: FilterQuery<IFollow>, page: number, limit: number) {
  //   return this.find(query, page, limit);
  // }
  async getFollowById(id: string) {
    return this.findById(id);
  }
}

export default FollowRepository;
