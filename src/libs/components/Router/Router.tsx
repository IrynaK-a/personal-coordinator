import { createBrowserRouter } from 'react-router-dom';
import { ErrorBoundary } from 'react-error-boundary';
import { AppRoute } from '../../types';
import { App } from '../App';
import { PublicRoute } from '../PublicRoute';
import { ProtectedRoute } from '../ProtectedRoute';
import {
  CoursePage,
  CreateCoursePage,
  ErrorPage,
  FindCoursePage,
  HomePage,
  LandingPage,
  MyCoursesPage,
  ProfilePage,
} from '../../pages';

export const router = createBrowserRouter([
  {
    path: AppRoute.ROOT,
    element: (
      <ErrorBoundary fallback={<ErrorPage />}>
        <App />
      </ErrorBoundary>
    ),
    children: [
      {
        path: AppRoute.ROOT,
        element: (
          <PublicRoute>
            <LandingPage />
          </PublicRoute>
        ),
      },
      {
        path: AppRoute.HOME,
        element: (
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.MY_COURSES,
        element: (
          <ProtectedRoute>
            <MyCoursesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.CREATE_COURSE,
        element: (
          <ProtectedRoute>
            <CreateCoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.COURSE,
        element: (
          <ProtectedRoute>
            <CoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.FIND_COURSES,
        element: (
          <ProtectedRoute>
            <FindCoursePage />
          </ProtectedRoute>
        ),
      },
      {
        path: AppRoute.PROFILE,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: '*',
        element: <ErrorPage isNotFoundPage />,
      },
    ],
  },
]);
