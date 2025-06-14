export interface FreelancerRequest {
  user: {
    user: {
      id: string;
      coin_id: string;
      profile_id: string;
      contact_id: string;
      confirmed_status: boolean;
      created_at: string;
      updated_at: string;
      username: string;
      display_name: string;
      avatar_url: string;
      birth_date: string;
      member_since: string;
      address_id: string;
      card_id: string;
      available: boolean;
      payment_status: "Pending" | "Completed" | "Failed"; // adjust as needed
    };
    coin: {
      id: string;
      balance: string;
      created_at: string;
      updated_at: string;
    };
    profile: {
      id: string;
      bio: string;
      average_response_time: string | null;
      created_at: string;
      updated_at: string;
      membership_level_id: string;
      is_verified: boolean;
      freelancer_type: "Fulltime" | "Parttime" | string; // extend as needed
    };
    contact: {
      id: string;
      email: string;
      phone_number: string | null;
      created_at: string;
      updated_at: string;
    };
    address: {
      id: string;
      address_details: string;
      country: string;
      created_at: string;
      updated_at: string;
      zip_code: string;
      subdistrict_or_district: string;
      district_or_subdistrict: string;
      province: string;
    };
    card: {
      id: string;
      front_card: string;
      back_card: string;
      title: string;
      name: string;
      surname: string;
      address_details: string;
      zip_code: string;
      subdistrict_or_district: string;
      district_or_subdistrict: string;
      province: string;
      card_number: string;
      birthdate: string;
    };
  };
  user_id: string;
  username: string;
  bio: string;
  avatar_url: string;
  is_verified: boolean;
  member_since: string;
  roles: string[];
}
