export interface RequestFreelancer {
  success: boolean;
  data: {
    jobs: Job[];
    total_items: number;
    total_pages: number;
    page: number;
    limit: number;
  };
}

export interface Job {
  id: string;
  user: JobUser;
  service_type: ServiceType;
  slug: string;
  title: string;
  base_price: string;
  price_before_discount: string;
  show: boolean;
  rating: string;
  status: number;
  is_hot: boolean;
  is_pro: boolean;
  description: string;
  is_instant_hire: boolean;
  purchase_count: number;
  reviews_count: number;
  packages: JobPackage[];
  images: JobImage[];
  created_at: string;
  updated_at: string;
  tag_ids: string[];
  completion_rate: number;
  rehire_orders_count: number;
}

export interface JobUser {
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  user_id: string;
}

export interface ServiceType {
  id: string;
  title: string;
  second_title: string;
  created_at: string;
  updated_at: string;
  parent_id: string;
  service_topic: string;
  image_url: string | null;
  is_popular: boolean;
  slug: string;
}

export interface JobPackage {
  id: string;
  job_id: string;
  description: string;
  price: string;
  sort_order: number;
  created_at: string;
  updated_at: string;
  package_name: string;
  execution_time: number;
}

export interface JobImage {
  id: string;
  job_id: string;
  image_url: string;
  is_cover_photo: boolean;
  sort_order: number;
  alt: string | null;
  created_at: string;
  updated_at: string;
}
