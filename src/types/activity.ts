export interface ActivityProps {
  id?: string;
  company_id: string;
  activity_title: string;
  pv_url?: string[];
  pictures_url?: string[];
  documents_url?: string[];
}

export interface ActivityFormProps {
  activity_title: string;
  pv_url?: File[];
  pictures_url?: File[];
  documents_url?: File[];
}

export interface ActivityDisplayProps {
  id: string;
  activity_title: string;
  pv_url: React.ReactNode;
  pictures_url: React.ReactNode;
  documents_url: React.ReactNode;
}
