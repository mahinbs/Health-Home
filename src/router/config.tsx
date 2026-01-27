
import { RouteObject } from 'react-router-dom';
import { lazy } from 'react';

const Home = lazy(() => import('../pages/home/page'));
const Consult = lazy(() => import('../pages/consult/page'));
const Homecare = lazy(() => import('../pages/homecare/page'));
const Pharmacy = lazy(() => import('../pages/pharmacy/page'));
const Profile = lazy(() => import('../pages/profile/page'));
const Records = lazy(() => import('../pages/records/page'));
const Cart = lazy(() => import('../pages/cart/page'));
const PaymentSuccess = lazy(() => import('../pages/payment-success/page'));
const HomecareBookingSuccess = lazy(() => import('../pages/homecare-booking-success/page'));
const MyConsultations = lazy(() => import('../pages/my-consultations/page'));
const MyHomecareRequests = lazy(() => import('../pages/my-homecare-requests/page'));
const MyRewards = lazy(() => import('../pages/my-rewards/page'));
const PaymentHistory = lazy(() => import('../pages/payment-history/page'));
const HelpSupport = lazy(() => import('../pages/help-support/page'));
const Diagnostic = lazy(() => import('../pages/diagnostic/page'));
const Connections = lazy(() => import('../pages/connections/page'));
const NotFound = lazy(() => import('../pages/NotFound'));

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/consult',
    element: <Consult />
  },
  {
    path: '/homecare',
    element: <Homecare />
  },
  {
    path: '/pharmacy',
    element: <Pharmacy />
  },
  {
    path: '/profile',
    element: <Profile />
  },
  {
    path: '/records',
    element: <Records />
  },
  {
    path: '/cart',
    element: <Cart />
  },
  {
    path: '/payment-success',
    element: <PaymentSuccess />
  },
  {
    path: '/homecare-booking-success',
    element: <HomecareBookingSuccess />
  },
  {
    path: '/my-consultations',
    element: <MyConsultations />
  },
  {
    path: '/my-homecare-requests',
    element: <MyHomecareRequests />
  },
  {
    path: '/my-rewards',
    element: <MyRewards />
  },
  {
    path: '/payment',
    element: <PaymentHistory />
  },
  {
    path: '/help-support',
    element: <HelpSupport />
  },
  {
    path: '/diagnostic',
    element: <Diagnostic />
  },
  {
    path: '/connections',
    element: <Connections />
  },
  {
    path: '*',
    element: <NotFound />
  }
];

export default routes;
