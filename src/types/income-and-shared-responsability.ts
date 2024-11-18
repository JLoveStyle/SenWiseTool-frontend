export interface incomeAndSharedResponsabilityDBProps {
  id?: string;
  company_id: string;
  type: "PAYMENT_JUSTIFICATION" | "SUSTENABILITY_DIFFERENTIAL" | "INVESTMENT_MANAGEMENT_PLAN";

  agreement_pv?: string[] | null;
  proof_of_paiement?: string[] | null;
  proof_of_expenses?: string[] | null;

  management_plan?: string[] | null;

  first_buyer_proof?: string[] | null;
  producer_payment_proof?: string[] | null;
}

// Proof of payment
export interface ProofOfPaiementDisplayProps {
  id?: string;
  agreement_pv: React.ReactNode;
  proof_of_paiement: React.ReactNode;
  proof_of_expenses: React.ReactNode;
}

export interface ProofOfPaiementFormProps {
  id?: string;
  agreement_pv: File[];
  proof_of_paiement: File[];
  proof_of_expenses: File[];
}

// Management
export interface ManagementPlanDisplayProps {
  id?: string;
  management_plan: React.ReactNode;
}

export interface ManagementPlanFormProps {
  management_plan: File[];
}

// differential of durability
export interface differentialDisplayProps {
  id?: string;
  first_buyer_proof: React.ReactNode;
  producer_payment_proof: React.ReactNode;
}

export interface differentialFormProps {
  first_buyer_proof: File[];
  producer_payment_proof: File[];
}
