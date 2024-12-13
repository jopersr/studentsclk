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
import { styled } from '@mui/material/styles';

interface ClassItem {
  id: string;
  name: string;
}

interface ManageClassesModalProps {
  open: boolean;
  onClose: () => void;
  classesList: ClassItem[];
  onEditClass?: (id: string) => void;
  onDeleteClass?: (id: string) => void;
}

const ClassesContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#f5f5f5',
  borderRadius: theme.shape.borderRadius,
  maxHeight: '300px',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(1),
  padding: theme.spacing(1),
}));

const ClassRow = styled(Box)(({ theme }) => ({
  backgroundColor: '#fff',
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(1),
}));

const SubHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

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
    return classesList.filter(cls => cls.name.toLowerCase().includes(searchTerm.toLowerCase()));
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
            {filteredClasses.map(cls => (
              <ClassRow key={cls.id}>
                <Typography variant="body1">{cls.name}</Typography>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <IconButton aria-label="edit" onClick={() => onEditClass?.(cls.id)}>
                    <EditIcon color="primary" />
                  </IconButton>
                  <IconButton aria-label="delete" onClick={() => onDeleteClass?.(cls.id)}>
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
