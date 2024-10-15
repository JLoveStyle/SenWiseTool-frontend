export interface MarketProps {
  id: string;
  compagny: string;
  campagne: string;
  price_of_day: number;
  start_date: string;
  end_date: string;
}

export interface MarketFormProps {
  id: string;
  price_of_day: number;
  start_date: string;
  end_date: string;
}

export type DBMarketProps = {
  id?: string;
  price_of_day: number;
  start_date: Date | string;
  end_date: Date | string;
  description?: string;
  location: string
  type_of_market?: 'COCOA' | 'COFFEE' | 'BANANA' | 'WOOD' | 'OTHER'
  status?: "OPEN" | "CLOSED";
  code?: string | null
  product_quantity: number
  created_at?: Date | string;
  updated_at?: Date | string;
  campaign_id: string;
  company_id?: string;
  company: string
  market_audit: [] // market_audit object[]: to be defined
  transaction: [] // transaction object[]: to be defined 
  receipts?: [] // receipt object[]: to be defined
};
