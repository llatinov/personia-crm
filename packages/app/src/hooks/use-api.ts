import { Contact } from "app/types/contacts";
import { apiMock, ApiResponse } from "../lib/api-mock";
import { uiSetError, uiSetLoading, useAppContext } from "../lib/app-context";

export function useApi() {
  const [, dispatch] = useAppContext();

  const withLoadingAndError = async <T>(apiCall: () => Promise<ApiResponse<T>>): Promise<ApiResponse<T>> => {
    uiSetLoading(dispatch, true);

    try {
      const response = await apiCall();

      if (!response.success) {
        uiSetError(dispatch, true);
      }

      return response;
    } catch (error) {
      uiSetError(dispatch, true);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error occurred"
      };
    } finally {
      uiSetLoading(dispatch, false);
    }
  };

  return {
    getContacts: () => withLoadingAndError(() => apiMock.getContacts()),
    getContact: (id: string) => withLoadingAndError(() => apiMock.getContact(id)),
    createContact: (contact: Contact) => withLoadingAndError(() => apiMock.createContact(contact)),
    updateContact: (id: string, contact: Contact) => withLoadingAndError(() => apiMock.updateContact(id, contact)),
    deleteContact: (id: string) => withLoadingAndError(() => apiMock.deleteContact(id)),
    searchContacts: (query: string) => withLoadingAndError(() => apiMock.searchContacts(query))
  };
}
