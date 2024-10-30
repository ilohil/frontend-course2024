import { Box, CssBaseline, Typography } from '@mui/material';
import { createBrowserRouter, isRouteErrorResponse, RouterProvider, useRouteError, Link } from "react-router-dom"
import Navi from "./muinavi/navi"
import TallennaTieto from './components/TallennaTieto'
import Reseptit from './components/Reseptit'
import Lomake from './components/Lomake'

function Error() {
  let error = useRouteError();
  if (isRouteErrorResponse(error)) {
    return (<Box>
      {error.status} {error.data}
    <Link to='/'> Etusivulle</Link>
    </Box>
    );
  }
  return (<Box>
    {error.message}
    <Link to='/'> Etusivulle</Link>
  </Box>);
}

const router = createBrowserRouter([
  {
  element: <Navi />,
  errorElement: <Error />,

  children: [{
    path: 'arviointi',
    element: <TallennaTieto />,
  },
  {
    path: 'ruokahaku',
    element: <Reseptit />,
  },
  {
    path: 'lomake', 
    element: <Lomake />,
  },
  {
    path: '/',
    element: <Typography></Typography>
  }
]
}])


function App() {

  return (
    <Box>
      <CssBaseline />
      <RouterProvider router={router} />
    </Box>
  )
}

export default App
