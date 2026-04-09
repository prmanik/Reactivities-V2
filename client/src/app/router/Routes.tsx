import { createBrowserRouter } from "react-router";
import App from "../layout/App";
import HomePage from "../../features/home/HomePage";
import ActivityDashBoard from "../../features/activities/dasboard/ActivityDashBoard";
import ActivityForm from "../../features/activities/form/ActivityForm";
import ActivityDetailsPage from "../../features/activities/details/ActivityDetailsPage";
import Counter from "../../features/counter/Counter";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      { path: '', element: <HomePage /> },
      { path: 'activities', element: <ActivityDashBoard /> },
      { path: 'activities/:id', element: <ActivityDetailsPage /> },
      { path: 'createActivity', element: <ActivityForm key="create" /> },
      { path: 'manage/:id', element: <ActivityForm /> },
      { path: 'counter', element: <Counter /> }
    ]
  }
]);