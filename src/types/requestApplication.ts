// Education
export type Education = {
  id: string;
  school_name: string;
  major: string;
  created_at: string;
  updated_at: string;
};

// Work Experience
export type WorkExperience = {
  id: string;
  company_name: string;
  position: string;
  start_month: string;
  start_year: number;
  is_current: boolean;
  end_month: string | null;
  end_year: number | null;
};

// Skill
export type Skill = {
  id: string;
  profile_id: string;
  level_id: string;
  skill_name: string;
  created_at: string;
  updated_at: string;
  level_name: string;
};

// Language
export type Language = {
  id: string;
  lang: string;
  level_id: string;
  profile_id: string;
  level_name: string;
};

// Certificate or Award
export type CertificateOrAward = {
  id: string;
  name: string;
};

// Main Profile Type
export type UserProfile = {
  user_id: string;
  username: string;
  bio: string;
  avatar_url: string;
  is_verified: boolean;
  member_since: string;
  education: Education[];
  work_experience: WorkExperience[];
  skill: Skill[];
  language: Language[];
  cert_and_award: CertificateOrAward[];
  roles: ("employer" | "freelancer")[];
  level_name: string;
};
