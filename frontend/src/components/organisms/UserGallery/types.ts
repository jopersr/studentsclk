import { StudentFormData } from "../../../utils/types";

export interface UsersGalleryProps {
  users: StudentFormData[];
  onEdit?: (student: StudentFormData) => void;
  onDelete?: (id: string) => void;
}