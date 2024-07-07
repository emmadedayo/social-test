"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const PostController_1 = __importDefault(require("@src/controllers/PostController"));
const file_middleware_1 = require("@src/middlewares/upload/file.middleware");
const middlewares_1 = require("@src/middlewares");
const validation_1 = require("@src/validation");
const router = express_1.default.Router();
const postController = new PostController_1.default();
router.post('/create', middlewares_1.isAuth, file_middleware_1.uploadImage.array('media'), postController.createPost);
router.put('/update/:id', middlewares_1.isAuth, file_middleware_1.uploadImage.array('media'), postController.updatePost);
router.delete('/delete/:id', middlewares_1.isAuth, postController.deletePost);
router.get('post/:id', middlewares_1.isAuth, postController.getPostById);
router.get('/', middlewares_1.isAuth, postController.getPosts);
router.get('/friend', middlewares_1.isAuth, postController.getFriendPosts);
router.put('/follow/:id', validation_1.followValidation, middlewares_1.isAuth, postController.follow);
router.delete('/unfollow/:id', middlewares_1.isAuth, postController.unfollow);
router.put('/comment/:id', validation_1.commentValidation, middlewares_1.isAuth, postController.createComment);
router.delete('/comment/:id', middlewares_1.isAuth, postController.deleteComment);
router.put('/like/:id', middlewares_1.isAuth, postController.like);
router.delete('/unlike/:id', middlewares_1.isAuth, postController.unlikePost);
router.get('/get-comment/:id', middlewares_1.isAuth, postController.getComments);
router.get('/get-notification', middlewares_1.isAuth, postController.getNotifications);
module.exports = router;
//# sourceMappingURL=post.route.js.map