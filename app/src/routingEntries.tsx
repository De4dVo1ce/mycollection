import React from 'react'
import { Navigate } from 'react-router-dom'
import { RoutingEntry } from './components/AppBase/appValues'
import { createUrlFor } from './createUrlFor'

const CollectionsPage = React.lazy(
  () => import('./components/Collections/Collections')
)
const CollectionDetailsPage = React.lazy(
  () => import('./components/CollectionDetails/CollectionDetails')
)
const CollectionNewPage = React.lazy(
  () => import('./components/CollectionNewEdit/CollectionNew')
)
const CollectionEditPage = React.lazy(
  () => import('./components/CollectionNewEdit/CollectionEdit')
)
const ItemDetailsPage = React.lazy(
  () => import('./components/ItemDetails/ItemDetails')
)
const NewItemPage = React.lazy(() => import('./components/ItemDetails/NewItem'))
const SharedPage = React.lazy(() => import('./components/Shared/Shared'))
const ProfilePage = React.lazy(() => import('./components/Profile/Profile'))
const SettingsPage = React.lazy(() => import('./components/Settings/Settings'))

export const routingEntries: Array<RoutingEntry> = [
  {
    authRequired: true,
    path: createUrlFor().root,
    element: <Navigate replace to={createUrlFor().login} />,
  },
  {
    authRequired: true,
    element: <CollectionsPage />,
    path: createUrlFor().collections.page,
  },
  {
    authRequired: true,
    element: <CollectionNewPage />,
    path: createUrlFor().collections.new,
  },
  {
    authRequired: true,
    element: <CollectionDetailsPage />,
    path: createUrlFor().collections.withId(`:collectionId`).page,
  },
  {
    authRequired: true,
    element: <CollectionEditPage />,
    path: createUrlFor().collections.withId(`:collectionId`).edit,
  },
  {
    authRequired: true,
    element: <NewItemPage />,
    path: createUrlFor().collections.withId(`:collectionId`).items.new,
  },
  {
    authRequired: true,
    element: <ItemDetailsPage />,
    path: createUrlFor()
      .collections.withId(`:collectionId`)
      .items.withId(`:itemId`),
  },
  {
    authRequired: true,
    element: <SharedPage />,
    path: createUrlFor().shares.page,
  },
  {
    authRequired: true,
    element: <ProfilePage />,
    path: createUrlFor().profile,
  },
  {
    authRequired: false,
    element: <SettingsPage />,
    path: createUrlFor().settings,
  },
]
