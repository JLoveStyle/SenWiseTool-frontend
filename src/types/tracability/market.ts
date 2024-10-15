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
  // market_number: number;
  description?: string;
  // location: string
  // type_of_market?: $Enums.MarketType
  // bordereau_vente_url: string
  // bon_entree_magazin_url: string
  status?: "WAITING" | "IN_PROGRESS" | "CLOSED";
  // code?: string | null
  // product_quantity: number
  created_at?: Date | string;
  updated_at?: Date | string;
  campaign_id: string;
  company_id?: string;
  // company: CompanyCreateNestedOneWithoutMarketsInput
  // market_audit?: Market_auditCreateNestedManyWithoutMarketInput
  // transaction?: TransactionCreateNestedManyWithoutMarketInput
  // receipts?: ReceiptCreateNestedManyWithoutMarketInput
};
