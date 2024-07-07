import { BaseRepository } from '@src/repositories/BaseRepository';
import { IPost } from '@src/interfaces/PostInterface';
import PostModel from '@src/model/Post.Model';
import { FilterQuery } from 'mongoose';

class PostRepository extends BaseRepository<IPost & Document> {
  constructor() {
    super(PostModel);
  }

  /**
   * Create a new user
   */
  async createPost(data: Partial<IPost>): Promise<IPost> {
    return this.create(data as Partial<IPost & Document>);
  }

  async deletePost(postId: string) {
    return this.deleteById(postId);
  }

  async findPostById(postId: string, []) {
    return this.findOne({ _id: postId }, []);
  }

  async updatePost(postId: string, data: Partial<IPost>): Promise<(IPost & Document) | null> {
    return this.updateById(postId, data as Partial<IPost & Document>);
  }

  async getPosts(query: FilterQuery<IPost>, page: number, limit: number) {
    return this.find(query, page, limit);
  }
}
export default PostRepository;
