import { Grid2 } from "@mui/material"
import UserCardSkeleton from "../../molecules/UserCardSkeleton"

const UserSkeletonGallery = () => {
  return (
    <Grid2 
    container 
    spacing={2} 
    justifyContent="flex-start" 
    alignItems="flex-start"
    size={{xs: 12, sm:6, md: 4, lg:3 }}     
  >
    <Grid2>
      <UserCardSkeleton />
    </Grid2>
    <Grid2>
      <UserCardSkeleton />
    </Grid2>
    <Grid2>
      <UserCardSkeleton />
    </Grid2>            
  </Grid2>
  )
}

export default UserSkeletonGallery;