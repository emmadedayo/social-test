"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const PostService_1 = require("@src/services/PostService");
const MiscService_1 = require("@src/services/MiscService");
class PostController {
    postService;
    miscService;
    constructor() {
        this.postService = new PostService_1.PostService();
        this.miscService = new MiscService_1.MiscService();
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
    async createPost(req, res, next) {
        return this.postService.post(req, res, next);
    }
    async updatePost(req, res, next) {
        return this.postService.updatePost(req, res, next);
    }
    async deletePost(req, res, next) {
        return this.postService.deletePost(req, res, next);
    }
    async getPostById(req, res, next) {
        return this.postService.getPostById(req, res, next);
    }
    async getPosts(req, res, next) {
        return this.postService.getPosts(req, res, next);
    }
    async follow(req, res, next) {
        return this.miscService.follow(req, res, next);
    }
    async unfollow(req, res, next) {
        return this.miscService.unfollow(req, res, next);
    }
    async createComment(req, res, next) {
        return this.miscService.createComment(req, res, next);
    }
    async deleteComment(req, res, next) {
        return this.miscService.deleteComment(req, res, next);
    }
    async like(req, res, next) {
        return this.miscService.likePost(req, res, next);
    }
    async unlikePost(req, res, next) {
        return this.miscService.unlikePost(req, res, next);
    }
    async getFriendPosts(req, res, next) {
        return this.postService.getFriendPosts(req, res, next);
    }
    async getComments(req, res, next) {
        return this.miscService.getComments(req, res, next);
    }
    async getNotifications(req, res, next) {
        return this.miscService.getNotifications(req, res, next);
    }
}
exports.default = PostController;
//# sourceMappingURL=PostController.js.map