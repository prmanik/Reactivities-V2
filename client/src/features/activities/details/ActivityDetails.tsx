import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"
import { useActivities } from "../../../lib/hooks/useActivities"

type Props = {
    selectedActivity: Activity
    onActivityCancel: () => void
    onFormOpen: (id: string) => void
}
export default function ActivityDetails({ selectedActivity, onActivityCancel, onFormOpen }: Props) {
    const { activities } = useActivities();
    const activity = activities?.find(a => a.id === selectedActivity.id);
    if (!activity) return <Typography>Loading...</Typography>
    return (
        <Card sx={{ borderRadius: 3 }}>
            <CardMedia
                component='img'
                src={`/images/categoryImages/${activity.category.toLowerCase()}.jpg`}
            />
            <CardContent>
                <Typography variant="h5">{activity.title}</Typography>
                <Typography variant="subtitle1" fontWeight='light'>
                    {activity.date}
                </Typography>
                <Typography variant="body1">{activity.description}</Typography>
            </CardContent>
            <CardActions>
                <Button onClick={() => onFormOpen(activity.id)} color="primary">
                    Edit
                </Button>
                <Button onClick={onActivityCancel} color="inherit">
                    Cancel
                </Button>
            </CardActions>
        </Card>
    )
}
