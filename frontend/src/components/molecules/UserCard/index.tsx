import React from 'react';
import { Avatar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ActionsContainer, EmailText, InfoContainer, StyledCard, StyledIconButton } from './styles';
import { UserCardProps } from './types';

const UserCard: React.FC<UserCardProps> = ({ fullName, email, id, onEdit, onDelete }) => {
  return (
    <StyledCard>
      <Avatar
        sx={{ width: 56, height: 56 }}
        style={{ backgroundColor: '#ccc' }}
      />
      <InfoContainer>
        <Typography align='left' variant="subtitle1" fontWeight="bold" >
          {fullName}
        </Typography>
        <EmailText align='left' variant="body2" color="text.secondary" noWrap>
          {email}
        </EmailText>
        <Typography align='left' variant="caption" color="text.disabled">
          ID: {id}
        </Typography>
      </InfoContainer>
      <ActionsContainer>
        <StyledIconButton onClick={onEdit} aria-label="edit">
          <EditIcon color="primary" />
        </StyledIconButton>
        <StyledIconButton onClick={onDelete} aria-label="delete">
          <DeleteIcon sx={{ color: 'red' }} />
        </StyledIconButton>
      </ActionsContainer>
    </StyledCard>
  );
};

export default UserCard;
