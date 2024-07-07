import { Request, Response } from 'express';

export interface TPaginationResponse extends Response {
  paginated_results?: {
    results: any;
    next: string;
    previous: string;
    currentPage: string;
    totalDocs: string;
    totalPages: string;
    lastPage: string;
  };
}
