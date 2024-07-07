"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@src/repositories/BaseRepository");
const Comment_Model_1 = __importDefault(require("@src/model/Comment.Model"));
class CommentRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Comment_Model_1.default);
    }
    async createComment(data) {
        return this.create(data);
    }
    async deleteComment(id) {
        return this.deleteById(id);
    }
    async getComments(query, page, limit) {
        return this.find(query, page, limit);
    }
}
exports.default = CommentRepository;
//# sourceMappingURL=CommentRepository.js.map