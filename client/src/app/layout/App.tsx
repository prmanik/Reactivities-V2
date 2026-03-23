import { Box, Container, CssBaseline, Typography } from "@mui/material"
import { useState } from "react"
import NavBar from "./NavBar"
import ActivityDashBoard from "../../features/activities/dasboard/ActivityDashBoard"
import { useActivities } from "../../lib/hooks/useActivities"

function App() {
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)
  const { activities, isPending } = useActivities();

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities!.find(x => x.id === id))
  }

  const handleCancelSelectActivity = () => {
    setSelectedActivity(undefined)
  }

  const handleFormOpen = (id?: string) => {
    if (id) {
      handleSelectActivity(id)
    } else {
      handleCancelSelectActivity()
    }
    setEditMode(true)
  }

  const handleFormClose = () => {
    setEditMode(false)
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee', minHeight: '100vh' }}>
      <CssBaseline />
      <NavBar
        OnFormOpen={handleFormOpen}
      />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        {!activities && isPending ? (<Typography>Loading...</Typography>)
          : (
            <ActivityDashBoard
              activities={activities}
              onActivitySelect={handleSelectActivity}
              onActivityCancel={handleCancelSelectActivity}
              selectedActivity={selectedActivity}
              onFormOpen={handleFormOpen}
              onFormClose={handleFormClose}
              editMode={editMode}
            />
          )}

      </Container>
    </Box>
  )
}

export default App
