import { ReceiptProps } from "@/types/tracability/receipt";
import { receiptData } from "@/utiles/tracability.const/receipt";

// export const receiptList = async (
//     // companyId: string
//   ): Promise<ReceiptProps[]> => {

//     const receipts: ReceiptProps[] = receiptData

//     return receipts;
//   };

const receiptStatistic = (data: ReceiptProps[]) => {
  const distinctMarkets = new Set<string>();
  let totalQuantity = 0;
  let totalNetWeight = 0;

  data.forEach((receipt) => {
    distinctMarkets.add(receipt.market_id);
    totalQuantity += receipt.quantity_in_bags;
    totalNetWeight += receipt.net_weight_in_kg;
  });

  return {
    distinctMarketCount: distinctMarkets.size,
    totalQuantity,
    totalNetWeight,
    totalSale: data.length,
  };
};

// Utilisation de la fonction
export const receiptStatData = receiptStatistic(receiptData);
