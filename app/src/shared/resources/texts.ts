export const messages = {
  REGISTERED: `Registered successfully.`,
  LOGGED_IN: (name: string) => `Logged in as '${name}'.`,
  LOGGED_OUT: `Logged out.`,

  SOMETHING_WENT_WRONG: (status?: number) =>
    `Somehting went wrong. Try again. [${status}]`,

  USERNAME_PASSWORD_NOT_CORRECT: `Username or password is not correct.`,
  USERNAME_ARLEADY_EXISTS: `Username already exists.`,

  LOGGING_OUT: `You are going to be logged out.`,

  COLLECTIONS_NOTHING_HERE: `Nothing here. Create a new collection by clicking the +.`,

  COLLECTION_CREATED: (name: string) => `Created collection '${name}'.`,
  COLLECTION_SAVED: (name: string) => `Saved collection '${name}'.`,
  COLLECTION_DELETE_CONFIRM: (name: string) =>
    `Do you really want to delete the collection '${name}'?\r\nThis cannot be undone.`,
  COLLECTION_DELETED: (name: string) => `Deleted collection '${name}'.`,

  ITEM_CREATED: (id: string) => `Created item '${id}'`,
  ITEM_SAVED: (id: string) => `Saved item '${id}'`,
  ITEM_DELETE_CONFIRM: (id: string) =>
    `Do you really want delete the item '${id}'?\r\nThis cannot be undone.`,
  ITEM_DELETED: (id: string) => `Deleted item '${id}'`,

  NO_DATA: `No data found`,
  COMING_SOON: `Coming soon...`,
}

export const labels = {
  HEADER_LOGIN: `Login`,
  HEADER_LOGOUT: `Logout`,
  HEADER_REGISTER: `Register`,
  HEADER_ELEMENTS: `Elements`,
  HEADER_COLLECTIONS: `Collections`,
  HEADER_COLUMN_CREATE: `Create Column`,
  HEADER_COLUMN_EDIT: `Edit Column`,
  HEADER_ELEMENT_NEW: `New Element`,
  HEADER_ELEMENT_EDIT: `Edit Element`,
  HEADER_COLLECTION_DELETE: `Delete Collection`,

  LABEL_USERNAME: `Username`,
  LABEL_PASSWORD: `Password`,
  LABEL_PASSWORD_CONFRIM: `Confirm Password`,
  LABEL_COLLECTION_NAME: `Collection Name`,
  LABEL_COLLECTION_DESCRIPTION: `Description`,
  LABEL_ELEMENT_PROPERTIES: `Element Properties`,
  LABEL_CUSTOM_TYPE: `Custom Type`,
  LABEL_TYPE: `Type`,
  LABEL_NAME: `Name`,

  BUTTON_LOGIN: `Login`,
  BUTTON_REGISTER: `Register`,
  BUTTON_DELETE: `Delete`,
  BUTTON_CANCEL: `Cancel`,
  BUTTON_SAVE: `Save`,
  BUTTON_CLOSE: `Close`,
  BUTTON_SAVE_AND_CLOSE: `Save & Close`,
  BUTTON_CREATE: `Create`,
  BUTTON_EDIT: `Edit`,
  BUTTON_ADD: `Add`,

  PROP_NAME: `Name:`,
  PROP_Type: `Type:`,
  PROP_DESCRIPTION: `Description:`,
  PROP_VALUES: `Values:`,

  ROWS_PER_PAGE: (rowsPerPage: number) => `Rows per page: ${rowsPerPage}`,
  SEARCH: (search: string) => `Search ${search}`,

  SHOW_LESS: `Show less`,
  SHOW_MORE: `Show more`,

  TYPE_TEXT: `Text`,
  TYPE_CUSTOM: `Custom`,
  TYPE_NUMBER: `Number`,

  TOOLTIP_SORTABLE: `Sortabel`,
  TOOLTIP_SEARCHABLE: `Searchable`,
  TOOLTIP_SHOW_IN_DESKTOP: `Show in desktop list`,
  TOOLTIP_SHOW_IN_MOBILE: `Show in mobile list`,
}
