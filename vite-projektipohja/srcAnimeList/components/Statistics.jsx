import {
    Box, Paper, Typography
    
    } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAnimes } from './animes';
import { PieChart } from '@mui/x-charts/PieChart';


function Statistics({ }) {

    const [animes, setAnime] = useState([]);

    const navigate = useNavigate();

    const searchAnimes = async () => {
        try {
            const response = await getAnimes();
            if (response.status === 200) {
                setAnime(response.data);
            } else {
                navigate('/error/Error in searching animes');
            }
        } catch (error) {
            navigate('/error/Error in searching animes');
        }
    }

    useEffect(() => {
        searchAnimes();
    }, []);

    const getTopThreeGrades = (animes) => {
        const sortedAnimes = [...animes].sort((a, b) => b.grade - a.grade);
        const topThree = sortedAnimes.slice(0, 3);
        return topThree.map(anime => anime.grade);
    };

    const getTopThreeNames = (animes) => {
        const sortedAnimes = [...animes].sort((a, b) => b.grade - a.grade);
        const topThree = sortedAnimes.slice(0, 3);
        return topThree.map(anime => anime.name);
    };

    const topThreeGrades = getTopThreeGrades(animes);
    const topThreeLabels = getTopThreeNames(animes);

    const pieChartData = animes.map(anime => ({
        value: anime.votecount,
        label: anime.name,
    }));

    return (
        <Box>
            <Typography textAlign="center" variant="h3" paddingTop={2}><b>Statistics</b></Typography>

            <Box
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                width="100%"
                marginTop={5}
                gap={4}
            >

                { }
                <Paper elevation={3} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box p={2}>
                        <Typography variant='h6'><b>Best rated</b></Typography>
                        <BarChart
                            xAxis={[
                                {
                                    id: 'barCategories',
                                    data: topThreeLabels,
                                    scaleType: 'band',
                                },
                            ]}
                            series={[
                                {
                                    data: topThreeGrades,
                                },
                            ]}
                            width={600}
                            height={300}
                        />
                    </Box>
                </Paper>

                { }
                <Paper elevation={3} style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                }}>
                    <Box p={2}>
                        <Typography variant='h6'><b>Most voted</b></Typography>
                        <PieChart
                            series={[
                                {
                                    data: pieChartData,
                                },
                            ]}
                            width={800}
                            height={300}
                        />
                    </Box>
                </Paper>

            </Box>
        </Box>
    );
}

export default Statistics;