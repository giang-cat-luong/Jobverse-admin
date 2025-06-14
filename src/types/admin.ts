export interface FreelancerApplication {
  user_id: string;
  sourceTypes: string[];
  avatar_url: string;
  username: string;
  display_name: string;
  bio: string;
  freelancer_type: string;
  apply_fee: boolean;
  birth_date: string;
  email: string;
  countryType: string;
  country: string;
  card_number: string;
  card_address_details: string;
  card_zip_code: string;
  card_subdistrict_or_district: string;
  card_district_or_subdistrict: string;
  card_province: string;
  front_card: string;
  back_card: string;
  title: string;
  name: string;
  surname: string;
  address_details: string;
  province: string;
  subdistrict_or_district: string;
  district_or_subdistrict: string;
  zip_code: string;
  payment_status: string;
  apply_status: boolean;
  is_verified: boolean;
  created_at: string;
}

export interface Category {
  id: string;
  name: string;
  image: string | null;
}

export interface Section {
  section_title: string;
  categories: Category[];
}

export interface ServiceCatalog {
  id: string;
  name: string;
  image: string | null;
  sections: Section[];
}

export interface CatalogData {
  service_catalogs: ServiceCatalog[];
}

export interface MembershipLevel {
  id: string;
  level: string;
  min_income: string;
  max_income: string | null;
  service_fee: string;
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
  alt: string;
  created_at: string;
  updated_at: string;
}

export interface JobWorkstep {
  id: string;
  job_id: string;
  description: string;
  sort_order: number;
}

export interface JobOnboarding {
  id: string;
  job_id: string;
  step1: boolean;
  step2: boolean;
  step3: boolean;
  step4: boolean;
  step5: boolean;
}

export interface ServiceCatalogInfo {
  id: string;
  title: string;
  second_title: string | null;
  created_at: string;
  updated_at: string;
  parent_id: string | null;
  service_topic: string | null;
  image_url: string | null;
  is_popular: boolean;
  slug: string;
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

export interface JobUser {
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string;
  user_id: string;
}

export interface Job {
  id: string;
  user: JobUser;
  service_catalog: ServiceCatalogInfo;
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
  worksteps: JobWorkstep[];
  onboarding: JobOnboarding;
  created_at: string;
  updated_at: string;
  tag_ids: any[];
  completion_rate: number;
  badges: any[];
  overall_rating: {
    overall_rating: number;
    average_responsiveness_rating: number;
    average_service_rating: number;
    average_skill_rating: number;
    average_worth_rating: number;
  };
  rehire_orders_count: number;
  additional_attributes: {
    certificate_badge: boolean;
    rehire_guarantee_badge: boolean;
  };
  socials: any[];
  websites: any[];
  related_jobs: any[];
  approval_status?: 'pending' | 'approved' | 'rejected';
}
