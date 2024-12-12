import React from 'react';
import { Grid2 } from '@mui/material';
import UserCard from '../../molecules/UserCard';

interface User {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

interface UsersGalleryProps {
  users: User[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}
// xs={12} sm={6} md={4} lg={3}
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
            id={user.id}
            onEdit={() => onEdit?.(user.id)}
            onDelete={() => onDelete?.(user.id)}
          />
        </Grid2>
      ))}
    </Grid2>
  );
};

export default UsersGallery;
