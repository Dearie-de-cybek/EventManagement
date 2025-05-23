import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./global.css";
import AttendeeSignupForm from "./pages/AttendeeSignupForm";
import OrganizerSignupForm from "./pages/OrganizerSignupForm";
import OnboardingPage from "./pages/OnboardingPage";
import AttendeeLoginPage from "./pages/AttendeeLoginPage";
import OrganizerLoginPage from "./pages/OrganizerLoginPage";
import LoginRedirect from "./components/LoginRedirect";
import CategorySelectionPage from "./pages/CategorySelectionPage";
import { Toaster } from "react-hot-toast";
import CreateEventPage from "./pages/CreateEventPage";
import EventProvider from "./context/EventContext";
import ProfileProvider from "./context/ProfileContext";
import TicketProvider from "./context/TicketContext";
import EventDetails from "./pages/EventDetails";
import MyTicketsPage from "./components/Ticket/MyTicketsPage";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/admin/dashboard";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import ProfilePage from "./pages/ProfilePage";
import ProtectedRoute from "./components/ProtectedRoute";
import NoAccessPage from "./components/NoAccessPage";
import UnderConstruction from "./pages/UnderConstruction";
import Calendar from "./pages/admin/Calendar";
import { AuthProvider } from "./context/AuthContext";
import DashboardRouter from "./components/DashboardRouter";
import Messages from "./pages/Messages";
import { WebSocketProvider } from "./context/WebSocketContext";

const App = () => {
  return (
    <AuthProvider>
      <EventProvider>
        <ProfileProvider>
          <TicketProvider>
            <WebSocketProvider>
              {" "}
              {/* Add SocketProvider */}
              <Router>
                <Toaster
                  position="top-center"
                  toastOptions={{ duration: 3000 }}
                />
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/signup/attendee"
                    element={<AttendeeSignupForm />}
                  />
                  <Route
                    path="/signup/organizer"
                    element={<OrganizerSignupForm />}
                  />
                  <Route path="/onboarding" element={<OnboardingPage />} />
                  <Route
                    path="/categories"
                    element={<CategorySelectionPage />}
                  />

                  {/* Separate login routes for different user types */}
                  <Route
                    path="/login/attendee"
                    element={<AttendeeLoginPage />}
                  />
                  <Route
                    path="/login/organizer"
                    element={<OrganizerLoginPage />}
                  />

                  {/* Redirect generic login to selection page */}
                  <Route path="/login" element={<LoginRedirect />} />

                  <Route path="/no-access" element={<NoAccessPage />} />

                  {/* Dashboard Router */}
                  <Route path="/dashboard" element={<DashboardRouter />} />

                  {/* Calendar route - keeping it as it is in your current setup */}
                  <Route path="/calendar" element={<Calendar />} />

                  {/* Organizer Protected Routes */}
                  <Route
                    path="/organizer-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["organizer"]}>
                        <Dashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/create-event"
                    element={
                      <ProtectedRoute allowedRoles={["organizer"]}>
                        <CreateEventPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/events/:eventId"
                    element={
                      <ProtectedRoute allowedRoles={["organizer"]}>
                        <EventDetails userRole="organizer" />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/messages"
                    element={
                      <ProtectedRoute>
                        <Messages />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/revenue"
                    element={
                      <ProtectedRoute allowedRoles={["organizer"]}>
                        <UnderConstruction />
                      </ProtectedRoute>
                    }
                  />

                  {/* Attendee Protected Routes */}
                  <Route
                    path="/attendee-dashboard"
                    element={
                      <ProtectedRoute allowedRoles={["attendee"]}>
                        <AttendeeDashboard />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/event-details/:eventId"
                    element={
                      <ProtectedRoute allowedRoles={["attendee"]}>
                        <EventDetails userRole="attendee" />
                      </ProtectedRoute>
                    }
                  />

                  {/* Routes for any authenticated user */}
                  <Route
                    path="/messages"
                    element={
                      <ProtectedRoute>
                        <Messages />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/tickets"
                    element={
                      <ProtectedRoute>
                        <MyTicketsPage />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/settings"
                    element={
                      <ProtectedRoute>
                        <UnderConstruction />
                      </ProtectedRoute>
                    }
                  />

                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <ProfilePage />
                      </ProtectedRoute>
                    }
                  />

                  {/* 404/Under Construction page */}
                  <Route path="*" element={<UnderConstruction />} />
                </Routes>
              </Router>
            </WebSocketProvider>
          </TicketProvider>
        </ProfileProvider>
      </EventProvider>
    </AuthProvider>
  );
};

export default App;
