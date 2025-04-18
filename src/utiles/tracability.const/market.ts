import { MarketDBProps, MarketStatus, MarketType } from "@/types/api-types";

export const marketData: MarketDBProps[] = [
  {
    id: "1",
    location: "Abidjan",
    price_of_theday: 500,
    start_date: "2024-10-01",
    end_date: "2024-10-31",
    description: "Cocoa market with premium quality products",
    type_of_market: MarketType.COCOA,
    status: MarketStatus.OPEN,
    code: "COC-001",
    product_quantity: 1000,
    created_at: "2024-10-01",
    updated_at: "2024-10-15",
    campaign_id: "CAMP123",
    company_id: "COMP456",
    company: "CocoaCorp",
    market_audit: [],
    transaction: [],
    receipts: [],

    tracability_level: "High",
    car_number: "AB-123-CD",
    quantity_in_bags_declared: 500,
    net_weight_declared: 10000,
    humidity: 5.0,

    sender: "Sender 1",
    Receiver: "Receiver 1",
    register_number: "CE 123 SN",
    driver_name: "Fokoua Gervé",
    quantity_in_bags_tone: 25,
    quantity_product: 105,

    sale_slip: "https://scontent.fdla4-1.fna.fbcdn.net/v/t39.30808-6/346986778_1657335211377222_4724449461371362928_n.jpg?stp=cp0_dst-jpg_e15_p320x320_q65&_nc_cat=108&ccb=1-7&_nc_sid=e5c1b6&_nc_ohc=Fl8OKLoW6pcQ7kNvgFDB0iG&_nc_zt=23&_nc_ht=scontent.fdla4-1.fna&_nc_gid=AIngOLWkd0QSwnLah9CZMoA&oh=00_AYDJSkSFisVX9YNnQzQi4s2XBFRDRrGGBaWL-npJ1LFDCg&oe=671FCC2A",
    store_entry_voucher: "https://www.fichespedagogiques.com/cdn/pdf/du-cacaoyer-aux-chocolats-de-noel_XL-3.jpg",
    supplier: "Alexandre",
    transmission_url: null,
    accompanying_url: null,
    bon_entree_magazin_url: null,
    bordereau_vente_url: null
  },
  {
    id: "2",
    location: "San Pedro",
    price_of_theday: 450,
    start_date: "2024-10-01",
    end_date: "2024-10-30",
    description: "Coffee market with a focus on sustainability",
    type_of_market: MarketType.COFFEE,
    status: MarketStatus.OPEN,
    code: "COF-002",
    product_quantity: 750,
    created_at: "2024-09-15",
    updated_at: "2024-09-30",
    campaign_id: "CAMP124",
    company: "CoffeeInc",
    market_audit: [],
    transaction: [],
    receipts: [],

    tracability_level: "Medium",
    car_number: "XY-456-ZY",
    quantity_in_bags_declared: 400,
    net_weight_declared: 8000,
    humidity: 6.2,

    sender: null,
    Receiver: null,
    register_number: null,
    driver_name: null,
    quantity_in_bags_tone: null,
    quantity_product: null,

    sale_slip: null,
    store_entry_voucher: null,
    supplier: "Koumandou",
    transmission_url: null,
    accompanying_url: null,
    bon_entree_magazin_url: null,
    bordereau_vente_url: null
  },
  {
    id: "3",
    location: "Man",
    price_of_theday: 300,
    start_date: "2024-10-05",
    end_date: "2024-10-20",
    type_of_market: MarketType.BANANA,
    status: MarketStatus.CLOSED,
    code: "COF-003",
    product_quantity: 500,
    created_at: "2024-10-01",
    updated_at: "2024-10-10",
    campaign_id: "CAMP125",
    company: "BananaGroup",
    market_audit: [],
    transaction: [],
    receipts: [],

    tracability_level: null,
    car_number: null,
    quantity_in_bags_declared: null,
    net_weight_declared: null,
    humidity: null,

    sender: "Sender 3",
    Receiver: "Receiver 3",
    register_number: "LT 3025 AB",
    driver_name: "Fokoua Gervé",
    quantity_in_bags_tone: 18,
    quantity_product: 93,

    sale_slip: "https://media-files.abidjan.net/document/document_ffb7zxiqipt.jpg",
    store_entry_voucher: "https://i.pinimg.com/550x/fa/1d/36/fa1d36ffaeaaf0a5456118ef39477f32.jpg",
    supplier: "Lontsi Joël",
    transmission_url: null,
    accompanying_url: null,
    bon_entree_magazin_url: null,
    bordereau_vente_url: null
  },
];