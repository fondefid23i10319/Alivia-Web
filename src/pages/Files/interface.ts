export interface PatientFileProps {
  id: number;
  article_name: string;
  file_type: string;
  document: string;
  UserArticle: {
    doctor: {
      first_name: string;
      last_name: string;
    };
  };
  createdAt: string;
}

export interface ProfessionalFileProps {
  id: number;
  article_name: string;
  text: string;
  file_type: string;
  document: string;
  professional: {
    first_name: string;
    last_name: string;
  };
  createdAt: string;
}
