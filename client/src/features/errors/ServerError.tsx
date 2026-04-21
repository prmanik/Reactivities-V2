import { Divider, Paper, Typography } from "@mui/material";
import { useLocation } from "react-router";

export default function ServerError() {
  const { state } = useLocation();
  return (
    <Paper>
      {state.error ? (
        <>
          <Typography variant="h3" color="secondary" gutterBottom sx={{ px: 4, pt: 2 }}>
            {state?.error?.message || 'There has been a error'}
          </Typography>
          <Divider />
          <Typography variant="body1" sx={{ p: 4 }}>
            {state?.error?.details || 'Internal Server error'}
          </Typography>
        </>
      ) : (
        <Typography variant="h5">
          Server Error
        </Typography>
      )}
    </Paper>
  )
}