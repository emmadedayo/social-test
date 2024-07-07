import { Request, Response, NextFunction } from 'express';
import { AuthService } from '@src/services/AuthService';
import { PostService } from '@src/services/PostService';
import { MiscService } from '@src/services/MiscService'; // Adjust the import path as needed

class PostController {
  private postService: PostService;
  private miscService: MiscService;

  constructor() {
    this.postService = new PostService();
    this.miscService = new MiscService();
    this.createPost = this.createPost.bind(this);
    this.updatePost = this.updatePost.bind(this);
    this.deletePost = this.deletePost.bind(this);
    this.getPostById = this.getPostById.bind(this);
    this.getPosts = this.getPosts.bind(this);
    this.follow = this.follow.bind(this);
    this.unfollow = this.unfollow.bind(this);
    this.createComment = this.createComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.like = this.like.bind(this);
    this.unlikePost = this.unlikePost.bind(this);
    this.getFriendPosts = this.getFriendPosts.bind(this);
    this.getComments = this.getComments.bind(this);
    this.getNotifications = this.getNotifications.bind(this);
  }

  async createPost(req: Request, res: Response, next: NextFunction) {
    return this.postService.post(req, res, next);
  }

  async updatePost(req: Request, res: Response, next: NextFunction) {
    return this.postService.updatePost(req, res, next);
  }

  async deletePost(req: Request, res: Response, next: NextFunction) {
    return this.postService.deletePost(req, res, next);
  }

  async getPostById(req: Request, res: Response, next: NextFunction) {
    return this.postService.getPostById(req, res, next);
  }

  async getPosts(req: Request, res: Response, next: NextFunction) {
    return this.postService.getPosts(req, res, next);
  }

  async follow(req: Request, res: Response, next: NextFunction) {
    return this.miscService.follow(req, res, next);
  }

  async unfollow(req: Request, res: Response, next: NextFunction) {
    return this.miscService.unfollow(req, res, next);
  }

  async createComment(req: Request, res: Response, next: NextFunction) {
    return this.miscService.createComment(req, res, next);
  }

  async deleteComment(req: Request, res: Response, next: NextFunction) {
    return this.miscService.deleteComment(req, res, next);
  }

  async like(req: Request, res: Response, next: NextFunction) {
    return this.miscService.likePost(req, res, next);
  }

  async unlikePost(req: Request, res: Response, next: NextFunction) {
    return this.miscService.unlikePost(req, res, next);
  }

  async getFriendPosts(req: Request, res: Response, next: NextFunction) {
    return this.postService.getFriendPosts(req, res, next);
  }

  async getComments(req: Request, res: Response, next: NextFunction) {
    return this.miscService.getComments(req, res, next);
  }

  async getNotifications(req: Request, res: Response, next: NextFunction) {
    return this.miscService.getNotifications(req, res, next);
  }
}

export default PostController;
