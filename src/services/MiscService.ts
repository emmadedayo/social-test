import { NextFunction, Request, Response } from 'express';
import ResponseT from '@src/interfaces/Response';
import { AuthenticatedRequest } from '@src/interfaces/AuthenticatedRequest';
import { response } from '@src/utils';
import { isValidObjectId } from '@src/configs/mongo-expectation';
import FollowRepository from '@src/repositories/FollowRepository';
import { CreateFollowDto } from '@src/dto/follower-dto';
import CommentRepository from '@src/repositories/CommentRepository';
import { CommentDto } from '@src/dto/comment.dto';
import LikeRepository from '@src/repositories/LikeRepository';
import CommentModel from '@src/model/Comment.Model';
import NotificationRepository from '@src/repositories/NotificationRepository';
import { NotificationType } from '@src/enum/NotificationEnum';
import { NotificationProcessor } from '@src/queue/notification-queue';
import { BullQueue } from '@src/queue/config/queue';
import PostRepository from '@src/repositories/PostRepository';

export class MiscService {
  private followRepository: FollowRepository;
  private commentRepository: CommentRepository;
  private likeRepository: LikeRepository;
  private notificationRepository: NotificationRepository;
  private postRepository: PostRepository;
  private notificationQueue: BullQueue<string>;

  constructor() {
    this.followRepository = new FollowRepository();
    this.commentRepository = new CommentRepository();
    this.likeRepository = new LikeRepository();
    this.notificationRepository = new NotificationRepository();
    this.postRepository = new PostRepository();
    this.notificationQueue = new BullQueue('notification-queue');
  }

  async follow(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const params = req.params.id
    const user = (req as unknown as AuthenticatedRequest).user;
    const dataParam = {
      followerId: params,
      userId: user._id,
    };
    if (dataParam.followerId === dataParam.userId) {
      return res.status(400).json(
        response<any>({
          data: null,
          success: false,
          message: 'You cannot follow yourself',
          status: 400,
        })
      );
    }
    await this.followRepository.createFollow(dataParam);
    await this.notificationQueue.add({ ...dataParam, type: NotificationType.FOLLOW });
    const processor = new NotificationProcessor(this.notificationQueue);
    processor.start();
    return res.status(201).json(
      response<any>({
        data: null,
        success: true,
        message: 'Followed successfully',
        status: 201,
      })
    );
  }

  async unfollow(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json(
        response<any>({
          data: null,
          success: false,
          message: 'Invalid post id',
          status: 400,
        })
      );
    }
    //check if following exists
    const follow = await this.followRepository.getFollowById(id);
    if (!follow) {
      return res.status(404).json(
        response<any>({
          data: null,
          success: false,
          message: 'Follow not found',
          status: 404,
        })
      );
    }
    await this.followRepository.deleteFollow(id);
    return res.status(200).json(
      response<any>({
        data: null,
        success: true,
        message: 'Unfollowed successfully',
        status: 200,
      })
    );
  }

  async createComment(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const data = req.body as CommentDto;
    const postId = req.params.id;
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
    const user = (req as unknown as AuthenticatedRequest).user;
    //check if post exists
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
    const dataParam = {
      comment: data.comment,
      postId: postId,
      userId: user._id,
    };
    if (post.user_id !== user._id) {
      await this.commentRepository.createComment(dataParam);
      await this.notificationQueue.add({ ...dataParam, type: NotificationType.COMMENT, postUserId: post.user_id });
      const processor = new NotificationProcessor(this.notificationQueue);
      processor.start();
    }
    return res.status(201).json(
      response<any>({
        data: null,
        success: true,
        message: 'Comment created successfully',
        status: 201,
      })
    );
  }

  async deleteComment(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json(
        response<any>({
          data: null,
          success: false,
          message: 'Invalid post id',
          status: 400,
        })
      );
    }
    await this.commentRepository.deleteComment(id);
    return res.status(200).json(
      response<any>({
        data: null,
        success: true,
        message: 'Comment deleted successfully',
        status: 200,
      })
    );
  }

  async likePost(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const postId = req.params.id;
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
    const user = (req as unknown as AuthenticatedRequest).user;
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
    const dataParam = {
      postId: postId,
      userId: user._id,
    };
    await this.likeRepository.createLike(dataParam);
    if (post.user_id !== user._id) {
      await this.notificationQueue.add({ ...dataParam, type: NotificationType.LIKE, postUserId: post.user_id });
      const processor = new NotificationProcessor(this.notificationQueue);
      processor.start();
    }
    return res.status(201).json(
      response<any>({
        data: null,
        success: true,
        message: 'Post liked successfully',
        status: 201,
      })
    );
  }

  async unlikePost(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const id = req.params.id;
    if (!isValidObjectId(id)) {
      return res.status(400).json(
        response<any>({
          data: null,
          success: false,
          message: 'Invalid id',
          status: 400,
        })
      );
    }
    await this.likeRepository.deleteLike(id);
    return res.status(200).json(
      response<any>({
        data: null,
        success: true,
        message: 'Post unliked successfully',
        status: 200,
      })
    );
  }

  async getComments(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const postId = req.params.id;
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
    const { results, meta } = await this.commentRepository.getComments({ postId: postId }, page, limit);
    const populatedPosts = await CommentModel.populate(results, [
      { path: 'userId', select: '-password -email -createdAt -updatedAt' },
    ]);
    return res.status(200).json(
      response<any>({
        data: {
          results: populatedPosts,
          meta,
        },
        success: true,
        message: 'Comments fetched successfully',
        status: 200,
      })
    );
  }

  async getNotifications(req: Request, res: Response<ResponseT<null>>, next: NextFunction) {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const user = (req as unknown as AuthenticatedRequest).user;
    const { results, meta } = await this.notificationRepository.findNotification({ userId: user._id }, page, limit);
    return res.status(200).json(
      response<any>({
        data: {
          results,
          meta,
        },
        success: true,
        message: 'Notifications fetched successfully',
        status: 200,
      })
    );
  }

  async createNotification(userId: string, type: NotificationType, description: string) {
    const data = {
      userId,
      type,
      description,
    };
    await this.notificationRepository.createNotification(data);
  }
}
