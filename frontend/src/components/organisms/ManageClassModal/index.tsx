import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  TextField,
  Box,
  Button
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { ManageClassesModalProps } from './types';
import { ClassesContainer, ClassRow, SubHeader } from './styles';
import EmptyState from '../../molecules/EmptyState';
import OneContainer from '../../atoms/OneConteiner';

const ManageClassesModal: React.FC<ManageClassesModalProps> = ({
  open,
  onClose,
  classesList,
  onEditClass,
  onDeleteClass
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredClasses = useMemo(() => {
    if (!searchTerm) return classesList;
    return classesList.filter(cls => cls.className.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm, classesList]);
  
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <Box sx={{ position: 'relative', paddingRight: '48px' }}>
        <DialogTitle>Manage classes</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{ position: 'absolute', right: 8, top: 8 }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <DialogContent dividers>
        <SubHeader>
          <Typography variant="subtitle2" gutterBottom>
            Class name
          </Typography>
          <TextField          
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            variant="standard"
          />
        </SubHeader>
        <Box mt={2}>
          <ClassesContainer>
            {
            filteredClasses.length === 0 ? (
              <OneContainer>
                <EmptyState
                  title="No classes available"
                  message="You can create a new class by click on Create Class button"
                />                
              </OneContainer>
            ) :
            filteredClasses.map(cls => (
              <ClassRow key={cls._id}>
                <Typography variant="body1">{cls.className}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton aria-label="edit" onClick={onEditClass ? () => onEditClass(cls) : undefined}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={onDeleteClass ? () => onDeleteClass(cls._id) : undefined}>
                    <DeleteIcon sx={{ color: 'red' }} />
                  </IconButton>
                </Box>
              </ClassRow>
            ))}
          </ClassesContainer>
        </Box>
      </DialogContent>      
      <DialogActions sx={{ justifyContent: 'flex-end' }}>
        <Button onClick={onClose} color="primary">
          CLOSE
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ManageClassesModal;
