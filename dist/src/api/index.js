"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_route_1 = __importDefault(require("@src/routes/auth.route"));
const post_route_1 = __importDefault(require("@src/routes/post.route"));
const routes_1 = __importDefault(require("@src/routes"));
const router = express_1.default.Router();
router.use('/', routes_1.default);
router.use('/auth', auth_route_1.default);
router.use('/post', post_route_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map