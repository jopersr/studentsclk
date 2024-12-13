import React from 'react';
import { Grid2 } from '@mui/material';
import UserCard from '../../molecules/UserCard';
import { UsersGalleryProps } from './types';
import UserCardSkeleton from '../../molecules/UserCardSkeleton';

const UsersGallery: React.FC<UsersGalleryProps> = ({ users, onEdit, onDelete, isLoading }) => {
  console.log('UsersGallery', isLoading);
  return (
    <Grid2 
      container 
      spacing={2} 
      justifyContent="flex-start" 
      alignItems="flex-start"
      size={{xs: 12, sm:6, md: 4, lg:3 }}     
    >
      {
        isLoading && (
          <>
            <Grid2>
              <UserCardSkeleton />
            </Grid2>
            <Grid2>
              <UserCardSkeleton />
            </Grid2>
            <Grid2>
              <UserCardSkeleton />
            </Grid2>            
          </>
        )
      }
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
