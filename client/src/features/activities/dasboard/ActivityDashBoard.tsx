import { Grid } from '@mui/material'
import ActivityList from './ActivityList'
import ActivityDetails from '../details/ActivityDetails'
import ActivityForm from '../form/ActivityForm'

type Props = {
    activities: Activity[] | undefined
    onActivitySelect: (id: string) => void
    onActivityCancel: () => void
    selectedActivity: Activity | undefined
    onFormOpen: (id: string) => void
    onFormClose: () => void
    editMode: boolean
}

export default function ActivityDashBoard({ activities,
    onActivitySelect,
    onActivityCancel,
    selectedActivity,
    onFormOpen,
    onFormClose,
    editMode
}: Props) {
    return (
        <Grid container spacing={3}>
            <Grid size={7}>
                <ActivityList
                    activities={activities}
                    onActivitySelect={onActivitySelect}
                />
            </Grid>
            <Grid size={5}>
                {selectedActivity && !editMode &&
                    <ActivityDetails
                        selectedActivity={selectedActivity}
                        onActivityCancel={onActivityCancel}
                        onFormOpen={onFormOpen}
                    />
                }
                {editMode &&
                    <ActivityForm
                        onFormClose={onFormClose}
                        activity={selectedActivity}
                    />
                }
            </Grid>
        </Grid>
    )
}
