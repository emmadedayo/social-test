import { Document, FilterQuery, Model } from 'mongoose';

export abstract class BaseRepository<T extends Document> {
  protected constructor(protected model: Model<T>) {}

  async create(doc: Partial<T>): Promise<T> {
    return this.model.create(doc);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(query: FilterQuery<T>, excludeFields: string[] = []): Promise<T | null> {
    const fieldsToExclude = excludeFields.map(field => '-' + field).join(' ');
    return this.model.findOne(query).select(fieldsToExclude).exec();
  }

  async find(
    query: FilterQuery<T>,
    page: number,
    limit: number
  ): Promise<{
    meta: {
      next: string;
      previous: string;
      lastPage: string;
      totalPages: any;
      currentPage: any;
      totalDocs: any;
    };
    results: any;
  }> {
    const options = {
      page,
      limit,
      sort: { createdAt: -1 },
      lean: true, // Use lean queries for faster performance
    };
    const result = await (this.model as any).paginate(query, options);
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

  async updateById(id: string, update: Partial<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, update, { new: true }).exec();
  }

  async deleteById(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }
}
