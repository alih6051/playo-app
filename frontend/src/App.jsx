import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar/Navbar";
import Account from "./pages/Account";
import CreateEvent from "./pages/CreateEvent";
import PrivateRoute from "./components/PrivateRoute";
import Event from "./pages/Event";
import RequstedEvent from "./pages/RequstedEvent";
import Request from "./pages/Request";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/event/:id" element={<Event />} />
        <Route
          path="/create-event"
          element={
            <PrivateRoute>
              <CreateEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/requested-events"
          element={
            <PrivateRoute>
              <RequstedEvent />
            </PrivateRoute>
          }
        />
        <Route
          path="/requests"
          element={
            <PrivateRoute>
              <Request />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
