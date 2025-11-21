import { ErrorBoundary } from "app/components/error-boundary/error-boundary";
import { AddContactPage } from "app/features/contacts/add/add-contact-page";
import { ContactsPage } from "app/features/contacts/list/contacts-page";
import { ViewContactPage } from "app/features/contacts/view/view-contact-page";
import { AddEventPage } from "app/features/events/add/add-event-page";
import { EventsPage } from "app/features/events/list/events-page";
import { ViewEventPage } from "app/features/events/view/view-event-page";
import { AddMeetingPage } from "app/features/meetings/add/add-meeting-page";
import { MeetingsPage } from "app/features/meetings/list/meetings-page";
import { ViewMeetingPage } from "app/features/meetings/view/view-meeting-page";
import { capacitorBackButtonHandler } from "app/lib/capacitor";
import { Paths } from "app/lib/consts";
import { HomePage } from "app/pages/home-page";
import { NoMatchPage } from "app/pages/no-match-page";
import { useEffect, useRef } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { MainLayout } from "./main-layout";

export function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const locationRef = useRef(location.pathname);

  useEffect(() => {
    locationRef.current = location.pathname;
  }, [location.pathname]);

  useEffect(() => {
    capacitorBackButtonHandler(
      () => locationRef.current,
      () => navigate(-1)
    );
  }, []);

  return (
    <ErrorBoundary>
      <Routes>
        <Route>
          <Route element={<MainLayout />}>
            <Route path={Paths.HOME} element={<HomePage />} />
            <Route path={Paths.CONTACTS} element={<ContactsPage />} />
            <Route path={Paths.CONTACTS_ADD} element={<AddContactPage />} />
            <Route path={Paths.CONTACTS_VIEW} element={<ViewContactPage />} />
            <Route path={Paths.EVENTS} element={<EventsPage />} />
            <Route path={Paths.EVENTS_ADD} element={<AddEventPage />} />
            <Route path={Paths.EVENTS_VIEW} element={<ViewEventPage />} />
            <Route path={Paths.MEETINGS} element={<MeetingsPage />} />
            <Route path={Paths.MEETINGS_ADD} element={<AddMeetingPage />} />
            <Route path={Paths.MEETINGS_VIEW} element={<ViewMeetingPage />} />
          </Route>
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
