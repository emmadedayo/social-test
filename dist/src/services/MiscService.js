"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MiscService = void 0;
const utils_1 = require("@src/utils");
const mongo_expectation_1 = require("@src/configs/mongo-expectation");
const FollowRepository_1 = __importDefault(require("@src/repositories/FollowRepository"));
const CommentRepository_1 = __importDefault(require("@src/repositories/CommentRepository"));
const LikeRepository_1 = __importDefault(require("@src/repositories/LikeRepository"));
const Comment_Model_1 = __importDefault(require("@src/model/Comment.Model"));
const NotificationRepository_1 = __importDefault(require("@src/repositories/NotificationRepository"));
const NotificationEnum_1 = require("@src/enum/NotificationEnum");
const notification_queue_1 = require("@src/queue/notification-queue");
const queue_1 = require("@src/queue/config/queue");
const PostRepository_1 = __importDefault(require("@src/repositories/PostRepository"));
class MiscService {
    followRepository;
    commentRepository;
    likeRepository;
    notificationRepository;
    postRepository;
    notificationQueue;
    constructor() {
        this.followRepository = new FollowRepository_1.default();
        this.commentRepository = new CommentRepository_1.default();
        this.likeRepository = new LikeRepository_1.default();
        this.notificationRepository = new NotificationRepository_1.default();
        this.postRepository = new PostRepository_1.default();
        this.notificationQueue = new queue_1.BullQueue('notification-queue');
    }
    async follow(req, res, next) {
        const data = req.body;
        const user = req.user;
        const dataParam = {
            followerId: user._id,
            userId: data.following_id,
        };
        if (dataParam.followerId === dataParam.userId) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'You cannot follow yourself',
                status: 400,
            }));
        }
        await this.followRepository.createFollow(dataParam);
        await this.notificationQueue.add({ ...dataParam, type: NotificationEnum_1.NotificationType.FOLLOW });
        const processor = new notification_queue_1.NotificationProcessor(this.notificationQueue);
        processor.start();
        return res.status(201).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Followed successfully',
            status: 201,
        }));
    }
    async unfollow(req, res, next) {
        const id = req.params.id;
        if (!(0, mongo_expectation_1.isValidObjectId)(id)) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid post id',
                status: 400,
            }));
        }
        const follow = await this.followRepository.getFollowById(id);
        if (!follow) {
            return res.status(404).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Follow not found',
                status: 404,
            }));
        }
        await this.followRepository.deleteFollow(id);
        return res.status(200).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Unfollowed successfully',
            status: 200,
        }));
    }
    async createComment(req, res, next) {
        const data = req.body;
        const postId = req.params.id;
        if (!(0, mongo_expectation_1.isValidObjectId)(postId)) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid post id',
                status: 400,
            }));
        }
        const user = req.user;
        const post = await this.postRepository.findPostById(postId, []);
        if (!post) {
            return res.status(404).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Post not found',
                status: 404,
            }));
        }
        const dataParam = {
            comment: data.comment,
            postId: postId,
            userId: user._id,
        };
        if (post.user_id !== user._id) {
            await this.commentRepository.createComment(dataParam);
            await this.notificationQueue.add({ ...dataParam, type: NotificationEnum_1.NotificationType.COMMENT, postUserId: post.user_id });
            const processor = new notification_queue_1.NotificationProcessor(this.notificationQueue);
            processor.start();
        }
        return res.status(201).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Comment created successfully',
            status: 201,
        }));
    }
    async deleteComment(req, res, next) {
        const id = req.params.id;
        if (!(0, mongo_expectation_1.isValidObjectId)(id)) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid post id',
                status: 400,
            }));
        }
        await this.commentRepository.deleteComment(id);
        return res.status(200).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Comment deleted successfully',
            status: 200,
        }));
    }
    async likePost(req, res, next) {
        const postId = req.params.id;
        if (!(0, mongo_expectation_1.isValidObjectId)(postId)) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid post id',
                status: 400,
            }));
        }
        const user = req.user;
        const post = await this.postRepository.findPostById(postId, []);
        if (!post) {
            return res.status(404).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Post not found',
                status: 404,
            }));
        }
        const dataParam = {
            postId: postId,
            userId: user._id,
        };
        await this.likeRepository.createLike(dataParam);
        if (post.user_id !== user._id) {
            await this.notificationQueue.add({ ...dataParam, type: NotificationEnum_1.NotificationType.LIKE, postUserId: post.user_id });
            const processor = new notification_queue_1.NotificationProcessor(this.notificationQueue);
            processor.start();
        }
        return res.status(201).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Post liked successfully',
            status: 201,
        }));
    }
    async unlikePost(req, res, next) {
        const id = req.params.id;
        if (!(0, mongo_expectation_1.isValidObjectId)(id)) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid id',
                status: 400,
            }));
        }
        await this.likeRepository.deleteLike(id);
        return res.status(200).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Post unliked successfully',
            status: 200,
        }));
    }
    async getComments(req, res, next) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const postId = req.params.id;
        if (!(0, mongo_expectation_1.isValidObjectId)(postId)) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid post id',
                status: 400,
            }));
        }
        const { results, meta } = await this.commentRepository.getComments({ postId: postId }, page, limit);
        const populatedPosts = await Comment_Model_1.default.populate(results, [
            { path: 'userId', select: '-password -email -createdAt -updatedAt' },
        ]);
        return res.status(200).json((0, utils_1.response)({
            data: {
                results: populatedPosts,
                meta,
            },
            success: true,
            message: 'Comments fetched successfully',
            status: 200,
        }));
    }
    async getNotifications(req, res, next) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const user = req.user;
        const { results, meta } = await this.notificationRepository.findNotification({ userId: user._id }, page, limit);
        return res.status(200).json((0, utils_1.response)({
            data: {
                results,
                meta,
            },
            success: true,
            message: 'Notifications fetched successfully',
            status: 200,
        }));
    }
    async createNotification(userId, type, description) {
        const data = {
            userId,
            type,
            description,
        };
        await this.notificationRepository.createNotification(data);
    }
}
exports.MiscService = MiscService;
//# sourceMappingURL=MiscService.js.map