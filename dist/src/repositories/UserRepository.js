"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRepository_1 = require("@src/repositories/BaseRepository");
const User_Model_1 = __importDefault(require("@src/model/User.Model"));
class UserRepository extends BaseRepository_1.BaseRepository {
    constructor() {
        super(User_Model_1.default);
    }
    async createUser(user) {
        return this.create(user);
    }
    async getUserByEmail(email, []) {
        return this.findOne({ email }, []);
    }
    async findUserById(userId) {
        return this.findById(userId);
    }
}
exports.default = UserRepository;
//# sourceMappingURL=UserRepository.js.map