import PostRepository from '@src/repositories/PostRepository';
import { NextFunction, Request, Response } from 'express';
import ResponseT from '@src/interfaces/Response';
import { CreateContentDto } from '@src/dto/post-dto';
import { AuthenticatedRequest } from '@src/interfaces/AuthenticatedRequest';
import { response } from '@src/utils';
import { isValidObjectId } from '@src/configs/mongo-expectation';
import { TPaginationResponse } from '@src/interfaces/PaginationInterface';
import PostModel from '@src/model/Post.Model';
import FollowModel from '@src/model/Follow.Model';
import { FilterQuery } from 'mongoose';
import { IPost } from '@src/interfaces/PostInterface';
import redisClient from '@src/cache/redis';

export class PostService {
  private postRepository: PostRepository;

  constructor() {
    this.postRepository = new PostRepository();
  }

  async post(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const data = req.body as CreateContentDto;
    const user = (req as unknown as AuthenticatedRequest).user;
    let savedImagePaths: string[] = [];
    if (req.files && Array.isArray(req.files)) {
      savedImagePaths = req.files.map((file: Express.Multer.File) => file.path);
    }
    const dataParam = {
      content: data.content || '',
      media_url: savedImagePaths,
      user_id: user._id,
    };
    await this.postRepository.createPost(dataParam);
    return res.status(201).json(
      response<any>({
        data: null,
        success: true,
        message: 'Post created successfully',
        status: 201,
      })
    );
  }

  //update
  async updatePost(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const data = req.body as CreateContentDto;
    const user = (req as unknown as AuthenticatedRequest).user;
    let savedImagePaths: string[] = [];
    const postId = req.params.id;
    const post = await this.postRepository.findPostById(postId, []);
    if (!post) {
      return res.status(404).json(
        response<any>({
          data: null,
          success: false,
          message: 'Post not found',
          status: 404,
        })
      );
    }
    if (req.files && Array.isArray(req.files)) {
      savedImagePaths = req.files.map((file: Express.Multer.File) => file.path);
    }
    // if savedImagePaths is not empty, the add the new image to the existing images
    const dataParam = {
      content: data.content || post.content,
      media_url: savedImagePaths.length > 0 ? [...(post.media_url || []), ...savedImagePaths] : post.media_url || [],
      user_id: user._id,
    };
    await this.postRepository.updatePost(postId, dataParam);
    return res.status(201).json(
      response<any>({
        data: null,
        success: true,
        message: 'Post updated successfully',
        status: 201,
      })
    );
  }

  //delete
  async deletePost(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const postId = req.params.id;
    await this.postRepository.deletePost(postId);
    return res.status(201).json(
      response<any>({
        data: null,
        success: true,
        message: 'Post deleted successfully',
        status: 201,
      })
    );
  }

  //get post by id
  async getPostById(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const postId = req.params.id;
    //check postId is a valid id with isValidObjectId method
    if (!isValidObjectId(postId)) {
      return res.status(400).json(
        response<any>({
          data: null,
          success: false,
          message: 'Invalid post id',
          status: 400,
        })
      );
    }
    const post = await this.postRepository.findPostById(postId, []);
    return res.status(201).json(
      response<any>({
        data: post,
        success: true,
        message: 'Post fetched successfully',
        status: 201,
      })
    );
  }

  async getPosts(req: Request, res: TPaginationResponse, next: NextFunction) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const query = {};
    const { results, meta } = await this.postRepository.getPosts(query, page, limit);
    const populatedPosts = await PostModel.populate(results, [
      { path: 'user_id', select: '-password -email -createdAt -updatedAt' },
      { path: 'likes_count' },
      { path: 'comments_count' },
    ]);

    return res.status(201).json(
      response<any>({
        data: {
          results: populatedPosts,
          meta,
        },
        success: true,
        message: 'Posts fetched successfully',
        status: 201,
      })
    );
  }

  async getFriendPosts(req: Request, res: TPaginationResponse, next: NextFunction) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const user = (req as unknown as AuthenticatedRequest).user;
    const cachedPost = await redisClient.get('post:'+user._id);
    if (cachedPost) {
      return res.status(200).json(
        response<any>({
          data: JSON.parse(cachedPost),
          success: true,
          message: 'Posts fetched successfullys',
          status: 200,
        })
      );
    }
    const hasFollowing = await FollowModel.exists({ userId: user._id });
    let query: FilterQuery<IPost>;
    if (hasFollowing) {
      const following = await FollowModel.find({ userId: user._id }).distinct('followerId');
      following.push(user._id);
      query = { user_id: { $in: following } };
    } else {
      query = { user_id: user._id };
    }

    const { results, meta } = await this.postRepository.getPosts(query, page, limit);
    results.sort(() => Math.random() - 0.5);
    const populatedPosts = await PostModel.populate(results, [
      { path: 'user_id', select: '-password -email -createdAt -updatedAt' },
      { path: 'likes_count' },
      { path: 'comments_count' },
    ]);
    const result = {
      results: populatedPosts,
      meta,
    };
    if (populatedPosts) {
      await redisClient.save('post:'+user._id, JSON.stringify(result), 3600);
    }
    return res.status(200).json(
      response<any>({
        data: result,
        success: true,
        message: 'Posts fetched successfully',
        status: 200,
      })
    );
  }
}
