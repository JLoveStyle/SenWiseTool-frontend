export interface ReceiptProps {
  id: string;
  market_id: string;
  village: string;
  farmer_id: string;
  date: string;

  net_weight_in_kg: number;
  quantity_in_bags: number;
  humidity_level_of_product: number;
  net_weight_for_sale: number;

  buyer: string;
  picture_of_sale: {
    url: string;
    gps_location: string;
    date_hour: string;
  };
  buyer_signature: string;
  farmer_signature: string;
}

export interface ReceiptTableProps {
  id: string;
  market_id: string;
  village: string;
  farmer_id: string;
  date: string;

  net_weight_in_kg: number;
  quantity_in_bags: number;

  buyer: string;
}
