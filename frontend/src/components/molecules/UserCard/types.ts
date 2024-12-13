export interface UserCardProps {
  fullName: string;
  email: string;
  id: string;
  onEdit?: () => void;
  onDelete?: () => void;
}