import { ErrorBoundary } from "app/components/error-boundary/error-boundary";
import { AddContactPage } from "app/features/contacts/add/add-contact-page";
import { ContactsPage } from "app/features/contacts/list/contacts-page";
import { ViewContactPage } from "app/features/contacts/view/view-contact-page";
import { Paths } from "app/lib/consts";
import { HomePage } from "app/pages/home-page";
import { NoMatchPage } from "app/pages/no-match-page";
import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./main-layout";

export function App() {
  return (
    <ErrorBoundary>
      <Routes>
        <Route>
          <Route element={<MainLayout />}>
            <Route path={Paths.HOME} element={<HomePage />} />
            <Route path={Paths.CONTACTS} element={<ContactsPage />} />
            <Route path={Paths.CONTACTS_ADD} element={<AddContactPage />} />
            <Route path={Paths.CONTACTS_VIEW} element={<ViewContactPage />} />
          </Route>
          <Route path="*" element={<NoMatchPage />} />
        </Route>
      </Routes>
    </ErrorBoundary>
  );
}
