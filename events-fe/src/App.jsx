import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "./layouts/Layout.jsx";
import CreateEvent from "./pages/events/CreateEvent.jsx";
import HomePage from "./pages/HomePage.jsx";
import Event from "./pages/events/Event.jsx";
import Events from "./pages/events/Events.jsx";
import EditEvent from "./pages/events/EditEvent.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import CreateParticipation from "./pages/participations/CreateParticipation.jsx";
import Unauthorized from "./pages/Unauthorized.jsx";
import CreateUser from "./pages/users/CreateUser.jsx";
import User from "./pages/users/User.jsx";
import Users from "./pages/users/Users.jsx";
import EditUser from "./pages/users/EditUser.jsx";
import Participation from "./pages/participations/Participation.jsx";
import Participations from "./pages/participations/Participations.jsx";
import EditParticipation from "./pages/participations/EditParticipation.jsx";
import { loadFromStorage } from "./store/authSlice.js";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadFromStorage());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<CreateUser />} />
          <Route path="unauthorized" element={<Unauthorized />} />
          <Route path="not-found" element={<NotFound />} />

          <Route path="events" element={<Events />} />
          <Route path="events/add" element={<CreateEvent />} />
          <Route path="events/:eventId" element={<Event />} />
          <Route path="events/:eventId/edit" element={<EditEvent />} />
          <Route path="events/:eventId/participate" element={<CreateParticipation />} />

          <Route path="users" element={<Users />} />
          <Route path="users/add" element={<CreateUser />} />
          <Route path="users/:userId" element={<User />} />
          <Route path="users/:userId/edit" element={<EditUser />} />

          <Route path="participations" element={<Participations />} />
          <Route path="participations/:participationId" element={<Participation />} />
          <Route path="participations/:participationId/edit" element={<EditParticipation />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
