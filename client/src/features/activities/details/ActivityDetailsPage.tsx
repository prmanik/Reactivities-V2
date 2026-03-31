import { Grid, Typography } from "@mui/material"
import { useParams } from "react-router";
import { useActivities } from "../../../lib/hooks/useActivities";
import ActivityDetailsSidebar from "./ActivityDetailsSidebar";
import ActivityDetailsChat from "./ActivityDetailsChat";
import ActivityDetailsInfo from "./ActivityDetailsInfo";
import ActivityDetailsHeader from "./ActivityDetailsHeader";

export default function ActivityDetailsPage() {
    const { id } = useParams();
    const { activity, isLoadingActivity } = useActivities(id);

    if (isLoadingActivity) return <Typography>Loading...</Typography>
    if (!activity) return <Typography>Activity Not found.</Typography>


    return (
        <Grid container spacing={3}>
            <Grid size={8}>
                <ActivityDetailsHeader activity={activity} />
                <ActivityDetailsInfo activity={activity} />
                <ActivityDetailsChat />
            </Grid>
            <Grid size={4}>
                <ActivityDetailsSidebar />
            </Grid>
        </Grid>
    )
}
