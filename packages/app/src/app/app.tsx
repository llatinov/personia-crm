import { ErrorBoundary } from "app/components/error-boundary/error-boundary";
import AddContactPage from "app/features/contacts-add/add-contact-page";
import ContactsPage from "app/features/contacts-list/contacts-page";
import { Paths } from "app/lib/consts";
import { NoMatchPage } from "app/pages/no-match-page";
import { Route, Routes } from "react-router-dom";
import MainLayout from "./main-layout";

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route>
          <Route element={<MainLayout />}>
            <Route path={Paths.HOME} element={<ContactsPage />} />
            <Route path={Paths.ADD_CONTACT} element={<AddContactPage />} />
          </Route>
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}

export default App;
