export interface MarketDisplayProps {
  id: string;
  code?: string | null;
  location: string;
  price_of_day: number;
  start_date: Date | string;
  end_date: Date | string;
  status?: "OPEN" | "CLOSED";
  campagne?: string;
  sale_slip: React.ReactNode | null;
  store_entry_voucher: React.ReactNode | null;
}

export interface FactoryAccompaniementSheetDisplayProps {
  id: string;
  code?: string | null;
  campagne?: string;
  tracability_level: string | null;
  car_number: string | null;
  quantity_in_bags_declared: number | null;
  net_weight_declared: number | null;
  humidity: number | null;
}

export interface TransmissionAndDeclarationSheetDisplayProps {
  id: string;
  code?: string | null;
  campagne?: string;
  sender: string | null;
  Receiver: string | null;
  register_number: string | null;
  driver_name: string | null;
  quantity_in_bags_tone: number | null;
  quantity_product: number | null;
}

export interface SaleSlipDisplayProps {
  id: string;
  code?: string | null;
  campagne?: string;
  sale_slip_title: string | null;
  sale_slip_description: string | null;
  sale_slip_url: string | null;
}

export interface MarketFormProps {
  id: string;
  location: string;
  price_of_day: number;
  start_date: Date | string;
  end_date: Date | string;
  description?: string;
}

// export type MarketDBProps = {
//   id: string;
//   location: string;
//   price_of_day: number;
//   start_date: Date | string;
//   end_date: Date | string;
//   description?: string;
//   type_of_market?: "COCOA" | "COFFEE" | "BANANA" | "WOOD" | "OTHER";
//   status?: "OPEN" | "CLOSED";
//   code?: string | null;
//   product_quantity: number;
//   created_at?: Date | string;
//   updated_at?: Date | string;
//   campaign_id: string;
//   company_id?: string;
//   company: string;
//   market_audit: []; // market_audit object[]: to be defined
//   transaction: []; // transaction object[]: to be defined
//   receipts?: []; // receipt object[]: to be defined
// };
