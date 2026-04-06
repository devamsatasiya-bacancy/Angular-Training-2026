export interface Book {
  id?: string;
  title: string;
  category: string;
  price: number;
  fileUrl?: string;
  fileName?: string;
  createdAt?: Date;
}

export interface BookQueryParams {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}

export interface UploadProgress {
  percentage: number;
  loaded: number;
  total: number;
}
