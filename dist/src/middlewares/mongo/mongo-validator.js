"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const mongoDbErrorHandler = (err, req, res, next) => {
    if (err instanceof mongodb_1.MongoError) {
        if (err.code === 11000) {
            return res.status(409).json({ error: 'Duplicate key error' });
        }
        else if (err.name === 'ValidationError') {
            return res.status(400).json({ error: err.message });
        }
        return res.status(500).json({ error: 'Database error' });
    }
    next(err);
};
exports.default = mongoDbErrorHandler;
//# sourceMappingURL=mongo-validator.js.map