"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@src/repositories/BaseRepository");
const Post_Model_1 = __importDefault(require("@src/model/Post.Model"));
class PostRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Post_Model_1.default);
    }
    async createPost(data) {
        return this.create(data);
    }
    async deletePost(postId) {
        return this.deleteById(postId);
    }
    async findPostById(postId, []) {
        return this.findOne({ _id: postId }, []);
    }
    async updatePost(postId, data) {
        return this.updateById(postId, data);
    }
    async getPosts(query, page, limit) {
        return this.find(query, page, limit);
    }
}
exports.default = PostRepository;
//# sourceMappingURL=PostRepository.js.map