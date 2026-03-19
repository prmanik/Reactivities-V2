import { Grid } from '@mui/material'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

type Props = {
    activities: Activity[]
    onActivitySelect: (id: string) => void
    onActivityCancel: () => void
    selectedActivity: Activity | undefined
    onFormOpen: (id: string) => void
    onFormClose: () => void
    editMode: boolean
    onCreateOrEdit: (activity: Activity) => void
    deleteActivity: (id: string) => void
}

export default function ActivityDashBoard({ activities,
    onActivitySelect,
    onActivityCancel,
    selectedActivity,
    onFormOpen,
    onFormClose,
    editMode,
    onCreateOrEdit,
    deleteActivity
}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList
                    activities={activities}
                    onActivitySelect={onActivitySelect}
                    deleteActivity={deleteActivity}
                />
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        activity={selectedActivity}
                        onActivityCancel={onActivityCancel}
                        onFormOpen={onFormOpen}

                    />
                }
                {editMode &&
                    <ActivityForm
                        onFormClose={onFormClose}
                        activity={selectedActivity}
                        onCreateOrEdit={onCreateOrEdit}
                    />
                }
            </Grid>
        </Grid>
    )
}
