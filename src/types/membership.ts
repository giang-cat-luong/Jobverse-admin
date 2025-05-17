export type MembershipLevel = {
  id: string;
  level: string;
  min_income: string;
  max_income: string | null;
  service_fee: string;
};

export type MembershipLevelsResponse = {
  membership_levels: MembershipLevel[] | undefined;
};