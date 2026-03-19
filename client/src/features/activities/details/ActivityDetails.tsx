import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material"

type Props = {
    activity: Activity
    onActivityCancel: () => void
    onFormOpen: (id: string) => void
}
export default function ActivityDetails({ activity, onActivityCancel, onFormOpen }: Props) {
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
                <Button onClick={()=> onFormOpen(activity.id)} color="primary">
                    Edit
                </Button>
                <Button onClick={onActivityCancel} color="inherit">
                    Cancel
                </Button>
            </CardActions>
        </Card>
    )
}
