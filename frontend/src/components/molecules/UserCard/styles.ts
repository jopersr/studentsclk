import { Box, Card, IconButton, styled, Typography } from "@mui/material";

export const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: theme.shadows[1],
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  width: '300px'
}));

export const InfoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  marginLeft: theme.spacing(2),
  flexGrow: 1, 
  overflow: 'hidden',
}));

export const EmailText = styled(Typography)({
  overflow: 'hidden',        
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',      
});

export const ActionsContainer = styled(Box)(() => ({
  display: 'flex',
  gap: 0,
}));

export const StyledIconButton = styled(IconButton)(() => ({
  padding: '2px',
}));