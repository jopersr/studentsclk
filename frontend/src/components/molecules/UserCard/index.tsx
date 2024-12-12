import React from 'react';
import { Card, Avatar, Typography, Box, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface UserCardProps {
  fullName: string;
  email: string;
  id: number;
  onEdit?: () => void;
  onDelete?: () => void;
}

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: theme.shadows[1],
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '300px'
}));

const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(2),
  flexGrow: 1, 
  overflow: 'hidden',
}));

const EmailText = styled(Typography)({
  overflow: 'hidden',        
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',      
});

const ActionsContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: 0,//theme.spacing(0),
}));

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  padding: '2px',
}));

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
