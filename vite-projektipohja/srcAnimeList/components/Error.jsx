import { Box, Typography } from '@mui/material';
import { useParams } from 'react-router';

function Error() {
    let { message } = useParams();

    return (
        <Box>
            <Typography color='error'>{message}</Typography>
        </Box>
    );
}

export default Error;