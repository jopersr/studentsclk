import React from 'react';
import { Grid2 } from '@mui/material';
import UserCard from '../../molecules/UserCard';
import { StudentFormData } from '../../../utils/types';

interface UsersGalleryProps {
  users: StudentFormData[];
  onEdit?: (student: StudentFormData) => void;
  onDelete?: (id: string) => void;
}

const UsersGallery: React.FC<UsersGalleryProps> = ({ users, onEdit, onDelete }) => {
  return (
    <Grid2 
      container 
      spacing={2} 
      justifyContent="flex-start" 
      alignItems="flex-start"
      size={{xs: 12, sm:6, md: 4, lg:3 }}     
    >
      {users.map((user) => (
        <Grid2 key={user.id}>
          <UserCard
            fullName={`${user.firstName} ${user.lastName}`}
            email={user.email}
            id={user.id || ''}
            onEdit={onEdit ? () => onEdit(user) : undefined}
            onDelete={onDelete ? () => onDelete(user.id || '') : undefined}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default UsersGallery;
