export interface MarketDisplayProps {
  id: string;
  location: string;
  price_of_day: number;
  start_date: string;
  end_date: string;
  status?: "OPEN" | "CLOSED";
  campagne: string;
}

export interface MarketFormProps {
  id: string;
  location: string;
  price_of_day: number;
  start_date: string;
  end_date: string;
  description?: string;
}

export type MarketDBProps = {
  id: string;
  location: string;
  price_of_day: number;
  start_date: string;
  end_date: string;
  // market_number: number;
  description?: string;
  // location: string
  // type_of_market?: $Enums.MarketType
  // bordereau_vente_url: string
  // bon_entree_magazin_url: string
  status?: "OPEN" | "CLOSED";
  // code?: string | null
  // product_quantity: number
  created_at?: string;
  updated_at?: string;
  campaign_id: string;
  company_id?: string;
  // company: CompanyCreateNestedOneWithoutMarketsInput
  // market_audit?: Market_auditCreateNestedManyWithoutMarketInput
  // transaction?: TransactionCreateNestedManyWithoutMarketInput
  // receipts?: ReceiptCreateNestedManyWithoutMarketInput
};
