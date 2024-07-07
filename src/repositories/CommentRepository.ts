import { BaseRepository } from '@src/repositories/BaseRepository';
import { IPost } from '@src/interfaces/PostInterface';
import { IFollow } from '@src/interfaces/FollowInterface';
import FollowModel from '@src/model/Follow.Model';
import { IComment } from '@src/interfaces/CommentInterface';
import CommentModel from '@src/model/Comment.Model';
import { FilterQuery } from 'mongoose';

class CommentRepository extends BaseRepository<IComment & Document> {
  constructor() {
    super(CommentModel);
  }

  async createComment(data: Partial<IComment>): Promise<IComment> {
    return this.create(data as Partial<IComment & Document>);
  }

  async deleteComment(id: string) {
    return this.deleteById(id);
  }

  async getComments(query: FilterQuery<IComment>, page: number, limit: number) {
    return this.find(query, page, limit);
  }
}

export default CommentRepository;
