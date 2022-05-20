export const createUrlFor = () => ({
  root: `/`,
  login: `/login`,
  register: `/register`,
  logout: `/logout`,
  profile: `/profile`,
  settings: `/settings`,
  about: `/about`,
  noMatch: '*',
  collections: {
    page: `/collections`,
    new: `/collections/new`,
    withId: (collectionId: string) => ({
      page: `/collections/${collectionId}`,
      edit: `/collections/${collectionId}/edit`,
      items: {
        withId: (elementId: string) =>
          `/collections/${collectionId}/items/${elementId}`,
        new: `/collections/${collectionId}/items/new`,
      },
    }),
  },
  shares: {
    page: `/shared`,
    withId: (id: string) => `/shared/${id}`,
  },
})
