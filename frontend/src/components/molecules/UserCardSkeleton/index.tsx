import { Stack } from '@mui/material'
import Skeleton from '@mui/material/Skeleton'
import { InfoContainer, StyledCard } from '../UserCard/styles';

const  UserCardSkeleton = () => {
  return (    
      <StyledCard>
        <Stack direction="row" spacing={2} alignItems="center">
          <Skeleton variant="circular" width={48} height={48} />
          <InfoContainer width={150}>
            <Skeleton variant="text" width="60%" height={24} />
            <Skeleton variant="text" width="80%" height={20} />
            <Skeleton variant="text" width="40%" height={16} />
          </InfoContainer>
          <Stack direction="row" spacing={1}>
            <Skeleton variant="circular" width={24} height={24} />
            <Skeleton variant="circular" width={24} height={24} />
          </Stack>
        </Stack>
      </StyledCard>    
  )
}

export default UserCardSkeleton;