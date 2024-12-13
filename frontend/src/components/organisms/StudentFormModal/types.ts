import { StudentFormData } from "../../../utils/types";

export interface ClassOption {
  id: string;
  name: string;
}

export interface CreateStudentFormData {
  firstName: string;
  lastName: string;
  email: string;  
  classIds: string[];
}

export interface CreateStudentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: CreateStudentFormData) => void;
  classesOptions: ClassOption[];
  student?: StudentFormData | null;
}