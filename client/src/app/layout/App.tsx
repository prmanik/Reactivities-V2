import { Box, Container, CssBaseline } from "@mui/material"
import axios from "axios"
import { useEffect, useState } from "react"
import NavBar from "./NavBar"
import ActivityDashBoard from "../../features/activities/dasboard/ActivityDashBoard"

function App() {

  const [activities, setActivities] = useState<Activity[]>([])
  const [selectedActivity, setSelectedActivity] = useState<Activity | undefined>(undefined)
  const [editMode, setEditMode] = useState(false)

  useEffect(() => {
    axios.get<Activity[]>("https://localhost:5001/api/activities")
      .then(response => setActivities(response.data))
  }, [])

  const handleSelectActivity = (id: string) => {
    setSelectedActivity(activities.find(x => x.id === id))
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

  const handleCreateOrEditActivity = (activity: Activity) => {
    if (activity.id) {
      setActivities(activities.map(x => x.id === activity.id ? activity : x))
    } else {
      const newActivity = { ...activity, id: activities.length.toString() }
      setSelectedActivity(newActivity)
      setActivities([...activities, newActivity])
    }
    setEditMode(false)
  }

  const handleDeleteActivity = (id: string) => {
    setActivities(activities.filter(x => x.id !== id))
  }

  return (
    <Box sx={{ bgcolor: '#eeeeee' }}>
      <CssBaseline />
      <NavBar
        OnFormOpen={handleFormOpen}
      />
      <Container maxWidth='xl' sx={{ mt: 3 }}>
        <ActivityDashBoard
          activities={activities}
          onActivitySelect={handleSelectActivity}
          onActivityCancel={handleCancelSelectActivity}
          selectedActivity={selectedActivity}
          onFormOpen={handleFormOpen}
          onFormClose={handleFormClose}
          editMode={editMode}
          onCreateOrEdit={handleCreateOrEditActivity}
          deleteActivity={handleDeleteActivity}
        />
      </Container>
    </Box>
  )
}

export default App
