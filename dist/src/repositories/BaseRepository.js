"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRepository = void 0;
class BaseRepository {
    model;
    constructor(model) {
        this.model = model;
    }
    async create(doc) {
        return this.model.create(doc);
    }
    async findById(id) {
        return this.model.findById(id).exec();
    }
    async findOne(query, excludeFields = []) {
        const exclude = excludeFields.length ? '-' + excludeFields.join(' -') : '';
        return this.model.findOne(query).select(exclude).exec();
    }
    async find(query, page, limit) {
        const options = {
            page,
            limit,
            sort: { createdAt: -1 },
            lean: true,
        };
        const result = await this.model.paginate(query, options);
        return {
            results: result.docs,
            meta: {
                next: result.nextPage ? `/api.social.com?page=${result.nextPage}&limit=${limit}` : '',
                previous: result.prevPage ? `/api.social.com?page=${result.prevPage}&limit=${limit}` : '',
                currentPage: result.page,
                totalDocs: result.totalDocs,
                totalPages: result.totalPages,
                lastPage: `/api.social.com?page=${result.totalPages}&limit=${limit}`,
            },
        };
    }
    async updateById(id, update) {
        return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
    }
    async deleteById(id) {
        return this.model.findByIdAndDelete(id).exec();
    }
}
exports.BaseRepository = BaseRepository;
//# sourceMappingURL=BaseRepository.js.map