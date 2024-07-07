"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@src/repositories/BaseRepository");
const Like_Model_1 = __importDefault(require("@src/model/Like.Model"));
class LikeRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Like_Model_1.default);
    }
    async createLike(data) {
        return this.create(data);
    }
    async deleteLike(id) {
        return this.deleteById(id);
    }
}
exports.default = LikeRepository;
//# sourceMappingURL=LikeRepository.js.map