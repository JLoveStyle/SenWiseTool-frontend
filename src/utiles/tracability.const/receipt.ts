import { ReceiptProps } from "@/types/tracability/receipt";

export const receiptData: ReceiptProps[] = [
  {
    id: "rec1",
    market_id: "mkt1",
    village: "Village A",
    farmer_id: "farmer1",
    date: "2023-09-01",

    net_weight_in_kg: 100,
    quantity_in_bags: 5,
    humidity_level_of_product: 12,
    net_weight_for_sale: 95,

    buyer: "Buyer A",
    picture_of_sale: {
      url: "https://fr.journalducameroun.com/wp-content/uploads/2024/01/cacao-ex-780x440.jpg",
      gps_location: "12.3456, 78.9012",
      date_hour: "2023-09-01T10:00:00Z",
    },
    buyer_signature: "https://example.com/signature_buyer_a.png",
    farmer_signature: "https://example.com/signature_farmer1.png",
  },
  {
    id: "rec2",
    market_id: "mkt2",
    village: "Village A",
    farmer_id: "farmer2",
    date: "2023-09-02",

    net_weight_in_kg: 150,
    quantity_in_bags: 7,
    humidity_level_of_product: 10,
    net_weight_for_sale: 145,

    buyer: "Buyer B",
    picture_of_sale: {
      url: "https://c7.alamy.com/compfr/ae2479/reste-les-travailleurs-sur-les-sacs-de-feves-de-cacao-la-cote-d-ivoire-ae2479.jpg",
      gps_location: "13.3456, 79.9012",
      date_hour: "2023-09-02T11:00:00Z",
    },
    buyer_signature:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Autograph_of_Benjamin_Franklin.svg/1280px-Autograph_of_Benjamin_Franklin.svg.png",
    farmer_signature:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/2/27/Gandhi_signature.svg/1280px-Gandhi_signature.svg.png",
  },
  {
    id: "rec3",
    market_id: "mkt1",
    village: "Village B",
    farmer_id: "farmer3",
    date: "2023-09-03",

    net_weight_in_kg: 200,
    quantity_in_bags: 10,
    humidity_level_of_product: 15,
    net_weight_for_sale: 190,

    buyer: "Buyer C",
    picture_of_sale: {
      url: "https://www.lebledparle.com/wp-content/uploads/2023/09/Cacao-Camer-758x426.jpg",
      gps_location: "14.3456, 80.9012",
      date_hour: "2023-09-03T12:00:00Z",
    },
    buyer_signature: "https://example.com/signature_buyer_c.png",
    farmer_signature: "https://example.com/signature_farmer3.png",
  },
  {
    id: "rec4",
    market_id: "mkt2",
    village: "Village A",
    farmer_id: "farmer4",
    date: "2023-09-04",

    net_weight_in_kg: 80,
    quantity_in_bags: 4,
    humidity_level_of_product: 9,
    net_weight_for_sale: 75,

    buyer: "Buyer D",
    picture_of_sale: {
      url: "https://example.com/picture4.jpg",
      gps_location: "15.3456, 81.9012",
      date_hour: "2023-09-04T13:00:00Z",
    },
    buyer_signature: "https://example.com/signature_buyer_d.png",
    farmer_signature: "https://example.com/signature_farmer4.png",
  },
  {
    id: "rec5",
    market_id: "mkt2",
    village: "Village B",
    farmer_id: "farmer5",
    date: "2023-09-05",

    net_weight_in_kg: 120,
    quantity_in_bags: 6,
    humidity_level_of_product: 8,
    net_weight_for_sale: 115,

    buyer: "Buyer E",
    picture_of_sale: {
      url: "https://example.com/picture5.jpg",
      gps_location: "16.3456, 82.9012",
      date_hour: "2023-09-05T14:00:00Z",
    },
    buyer_signature: "https://example.com/signature_buyer_e.png",
    farmer_signature: "https://example.com/signature_farmer5.png",
  },
];
