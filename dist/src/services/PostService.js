"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const PostRepository_1 = __importDefault(require("@src/repositories/PostRepository"));
const utils_1 = require("@src/utils");
const mongo_expectation_1 = require("@src/configs/mongo-expectation");
const Post_Model_1 = __importDefault(require("@src/model/Post.Model"));
const Follow_Model_1 = __importDefault(require("@src/model/Follow.Model"));
const redis_1 = __importDefault(require("@src/cache/redis"));
class PostService {
    postRepository;
    constructor() {
        this.postRepository = new PostRepository_1.default();
    }
    async post(req, res, next) {
        const data = req.body;
        const user = req.user;
        let savedImagePaths = [];
        if (req.files && Array.isArray(req.files)) {
            savedImagePaths = req.files.map((file) => file.path);
        }
        const dataParam = {
            content: data.content || '',
            media_url: savedImagePaths,
            user_id: user._id,
        };
        await this.postRepository.createPost(dataParam);
        return res.status(201).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Post created successfully',
            status: 201,
        }));
    }
    async updatePost(req, res, next) {
        const data = req.body;
        const user = req.user;
        let savedImagePaths = [];
        const postId = req.params.id;
        const post = await this.postRepository.findPostById(postId, []);
        if (!post) {
            return res.status(404).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Post not found',
                status: 404,
            }));
        }
        if (req.files && Array.isArray(req.files)) {
            savedImagePaths = req.files.map((file) => file.path);
        }
        const dataParam = {
            content: data.content || post.content,
            media_url: savedImagePaths.length > 0 ? [...(post.media_url || []), ...savedImagePaths] : post.media_url || [],
            user_id: user._id,
        };
        await this.postRepository.updatePost(postId, dataParam);
        return res.status(201).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Post updated successfully',
            status: 201,
        }));
    }
    async deletePost(req, res, next) {
        const postId = req.params.id;
        await this.postRepository.deletePost(postId);
        return res.status(201).json((0, utils_1.response)({
            data: null,
            success: true,
            message: 'Post deleted successfully',
            status: 201,
        }));
    }
    async getPostById(req, res, next) {
        const postId = req.params.id;
        if (!(0, mongo_expectation_1.isValidObjectId)(postId)) {
            return res.status(400).json((0, utils_1.response)({
                data: null,
                success: false,
                message: 'Invalid post id',
                status: 400,
            }));
        }
        const post = await this.postRepository.findPostById(postId, []);
        return res.status(201).json((0, utils_1.response)({
            data: post,
            success: true,
            message: 'Post fetched successfully',
            status: 201,
        }));
    }
    async getPosts(req, res, next) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const query = {};
        const { results, meta } = await this.postRepository.getPosts(query, page, limit);
        const populatedPosts = await Post_Model_1.default.populate(results, [
            { path: 'user_id', select: '-password -email -createdAt -updatedAt' },
            { path: 'likes_count' },
            { path: 'comments_count' },
        ]);
        return res.status(201).json((0, utils_1.response)({
            data: {
                results: populatedPosts,
                meta,
            },
            success: true,
            message: 'Posts fetched successfully',
            status: 201,
        }));
    }
    async getFriendPosts(req, res, next) {
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const user = req.user;
        const cachedPost = await redis_1.default.get('post:' + user._id);
        if (cachedPost) {
            return res.status(200).json((0, utils_1.response)({
                data: JSON.parse(cachedPost),
                success: true,
                message: 'Posts fetched successfully',
                status: 200,
            }));
        }
        const hasFollowing = await Follow_Model_1.default.exists({ userId: user._id });
        let query;
        if (hasFollowing) {
            const following = await Follow_Model_1.default.find({ userId: user._id }).distinct('followerId');
            following.push(user._id);
            query = { user_id: { $in: following } };
        }
        else {
            query = { user_id: user._id };
        }
        const { results, meta } = await this.postRepository.getPosts(query, page, limit);
        const populatedPosts = await Post_Model_1.default.populate(results, [
            { path: 'user_id', select: '-password -email -createdAt -updatedAt' },
            { path: 'likes_count' },
            { path: 'comments_count' },
        ]);
        const result = {
            results: populatedPosts,
            meta,
        };
        await redis_1.default.save('post:' + user._id, JSON.stringify(result), 3600);
        return res.status(200).json((0, utils_1.response)({
            data: result,
            success: true,
            message: 'Posts fetched successfully',
            status: 200,
        }));
    }
}
exports.PostService = PostService;
//# sourceMappingURL=PostService.js.map