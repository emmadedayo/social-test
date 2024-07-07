"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@src/repositories/BaseRepository");
const Follow_Model_1 = __importDefault(require("@src/model/Follow.Model"));
class FollowRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(Follow_Model_1.default);
    }
    async createFollow(data) {
        return this.create(data);
    }
    async deleteFollow(followId) {
        return this.deleteById(followId);
    }
    async findFollowById(followId, []) {
        return this.findOne({ _id: followId }, []);
    }
    async updateFollow(followId, data) {
        return this.updateById(followId, data);
    }
    async getFollowById(id) {
        return this.findById(id);
    }
}
exports.default = FollowRepository;
//# sourceMappingURL=FollowRepository.js.map