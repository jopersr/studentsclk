import { Class } from "../../../utils/types";

export interface ManageClassesModalProps {
  open: boolean;
  onClose: () => void;
  classesList: Class[];
  onEditClass?: (cls: Class) => void;
  onDeleteClass?: (id: string) => void;
}