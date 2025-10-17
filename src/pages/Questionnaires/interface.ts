export interface PatientQuestionnaireProps {
  id: number;
  questionnaireId: number;
  name: string;
  createdAt: string;
}

export interface ProfessionalQuestionnaireProps {
  id: number;
  active: boolean;
  creator: string;
  questionary_name: string;
  createdAt: string;
}
