export interface Bank {
  id: string;
  bank_code: string;
  bank_name: string;
  country_code: string;
  country_name: string;
  created_at: string;
}

export interface Country {
  country_code: string;
  country_name: string;
  bank_count: number;
}

export interface BankingData {
  countries: Country[];
  banks: Bank[];
}
