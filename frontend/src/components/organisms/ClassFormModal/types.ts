import { ClassFormData } from "../../../utils/types";

export interface ClassFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: ClassFormData) => void;
  classData?: ClassFormData | null;
}