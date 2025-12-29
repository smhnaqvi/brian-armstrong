import { RouteObject } from 'react-router-dom'
import Main from '../pages/dashboard/main'
import Layout from '../components/layout'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Main />,
      },
      {
        path: 'dashboard',
        element: <Main />,
      },
    ],
  },
]

export default routes

