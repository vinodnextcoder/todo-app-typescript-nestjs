import React from 'react'
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useParams, useNavigate } from 'react-router-dom';



export default function TaskList({ setLoggedIn }) {
    const { id } = useParams();

    return (
<Container>
    <Grid container spacing={2} marginTop={2}>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="primary">
            </Typography>
        </Grid>
        <Grid item xs={12} md={6}>
            <Typography variant="subtitle1" color="primary">
                Created:
            </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
            <Typography variant="h5">
                {taskInfo.title}
            </Typography>
        </Grid>
    </Grid>
</Container>
    );
}
