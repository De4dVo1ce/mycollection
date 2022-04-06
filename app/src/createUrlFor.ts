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
    withId: (collectionId: string) => ({
      page: `/collections/${collectionId}`,
      element: (elementId: string) =>
        `/collections/${collectionId}/elements/${elementId}`,
    }),
  },
  shared: {
    page: `/shared`,
    withId: (id: string) => `/shared/${id}`,
  },
})
