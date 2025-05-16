export interface FreelancerApplication {
  id: string;
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
  payment_status: 'pending' | 'verified' | 'rejected';
  application_status: 'pending' | 'approved' | 'rejected';
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
