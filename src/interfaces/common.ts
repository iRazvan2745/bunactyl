export interface PaginationLinks {
  previous?: string;
  next?: string;
}

export interface PaginationMeta {
  total: number;
  count: number;
  per_page: number;
  current_page: number;
  total_pages: number;
  links: PaginationLinks;
}

export interface ResponseMeta {
  pagination: PaginationMeta;
}

export interface ResourceMeta {
  resource: string;
}

export interface PaginatedResponse<T> {
  object: string;
  data: T[];
  meta: ResponseMeta;
}

export interface SingleResponse<T> {
  object: string;
  attributes: T;
  meta?: ResourceMeta;
}
