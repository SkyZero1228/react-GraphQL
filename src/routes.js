import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { ConnectedSwitch } from 'reactRouterConnected';
import Loadable from 'react-loadable';
import Page from 'components/LayoutComponents/Page';
import NotFoundPage from 'pages/DefaultPages/NotFoundPage';
import HomePage from 'pages/DefaultPages/HomePage';
import MemberRoute from './components/Hocs/MemberRoute';
import CorporateRoute from './components/Hocs/CorporateRoute';
import AffiliateRoute from './components/Hocs/AffiliateRoute';

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => null,
  });

const loadableRoutes = {
  '/': {
    component: loadable(() => import('pages/DefaultPages/LoginPage')),
  },
  '/forgot-password': {
    component: loadable(() => import('pages/DefaultPages/ForgotPasswordPage')),
  },
  '/reset-password/:token': {
    component: loadable(() => import('pages/DefaultPages/ResetPasswordPage')),
  },

  //Affiliates Routes

  '/affiliates/commissions': {
    component: loadable(() => import('pages/Apps/Affiliates/CommissionsPage/CommissionsAffiliatePage')),
  },
  '/affiliates/genealogy': {
    component: loadable(() => import('pages/Apps/Affiliates/GenealogyPage/GenealogyPage')),
  },
  '/affiliates/subscriptions': {
    component: loadable(() => import('pages/Apps/Affiliates/TrialsPage/TrialsPage')),
  },
  '/affiliates/links': {
    component: loadable(() => import('pages/Apps/Affiliates/LinksPage/LinksPage')),
  },
  '/affiliates/leads': {
    component: loadable(() => import('pages/Apps/Affiliates/LeadsPage/LeadsPage')),
  },

  //Member Routes
  '/members': {
    component: loadable(() => import('pages/Apps/Members/MembersHomePage')),
  },
  '/members/faq': {
    component: loadable(() => import('pages/Apps/Members/FAQPage/FaqPage')),
  },
  '/members/support': {
    component: loadable(() => import('pages/Apps/Members/SupportPage')),
  },
  '/members/briefcase/marketing-tools': {
    component: loadable(() => import('pages/Apps/Members/Briefcase/MarketingToolsPage')),
  },
  '/members/briefcase/helpful-documents': {
    component: loadable(() => import('pages/Apps/Members/Briefcase/HelpfulDocumentsPage')),
  },
  '/members/briefcase/videos': {
    component: loadable(() => import('pages/Apps/Members/Briefcase/VideosPage')),
  },
  '/members/briefcase/flyers-and-posters': {
    component: loadable(() => import('pages/Apps/Members/Briefcase/FlyersAndPostersPage')),
  },
  '/members/briefcase/clickfunnels-landing-pages': {
    component: loadable(() => import('pages/Apps/Members/Briefcase/ClickFunnelsPage')),
  },
  '/members/briefcase/prospects': {
    component: loadable(() => import('pages/Apps/Members/Briefcase/ProspectsPage/ProspectsPage')),
  },
  '/members/account-settings/user-account': {
    component: loadable(() => import('pages/Apps/Members/AccountSettings/UserAccountPage')),
  },
  '/members/account-settings/change-password': {
    component: loadable(() => import('pages/Apps/Members/AccountSettings/ChangePasswordPage')),
  },
  '/members/account-settings/payment-information': {
    component: loadable(() => import('pages/Apps/Members/AccountSettings/PaymentInformationPage')),
  },
  '/members/briefcase/escape-bucks': {
    component: loadable(() => import('pages/Apps/Members/Briefcase/EscapeBucksPage/EscapeBucksPage')),
  },

  //Corporation Routes
  '/corporate/add-escapebucks': {
    component: loadable(() => import('pages/Apps/Corporate/AddEscapeBucks/AddEscapeBucksPage')),
  },
  '/corporate/assignment-jobs/add': {
    component: loadable(() => import('pages/Apps/Corporate/AssignmentJobsPage/AddAssignmentJobsPage/AddAssignmentJobsPage')),
  },
  '/corporate/assignment-jobs': {
    component: loadable(() => import('pages/Apps/Corporate/AssignmentJobsPage/AssignmentJobsPage')),
  },
  '/corporate/funnels/edit/:id': {
    component: loadable(() => import('pages/Apps/Corporate/FunnelsPage/EditFunnel/EditFunnelPage')),
  },
  '/corporate/funnels/add': {
    component: loadable(() => import('pages/Apps/Corporate/FunnelsPage/AddFunnel/AddFunnelPage')),
  },
  '/corporate/funnels': {
    component: loadable(() => import('pages/Apps/Corporate/FunnelsPage/FunnelsPage')),
  },
  '/corporate/products/edit/:id': {
    component: loadable(() => import('pages/Apps/Corporate/ProductsPage/Edit')),
  },
  '/corporate/products/add': {
    component: loadable(() => import('pages/Apps/Corporate/ProductsPage/Add')),
  },
  '/corporate/products': {
    component: loadable(() => import('pages/Apps/Corporate/ProductsPage/List')),
  },
  '/corporate/commissions': {
    component: loadable(() => import('pages/Apps/Corporate/CommissionsPage/CommissionsPage')),
  },
  '/corporate/orders': {
    component: loadable(() => import('pages/Apps/Corporate/OrdersPage/OrdersPage')),
  },
  '/corporate/user-subscriptions': {
    component: loadable(() => import('pages/Apps/Corporate/UserSubscriptionsPage/UserSubscriptionsPage')),
  },
  '/corporate/videos': {
    component: loadable(() => import('pages/Apps/Corporate/VideosPage/VideosPage')),
  },
  '/corporate/videos/new-video': {
    component: loadable(() => import('pages/Apps/Corporate/VideosPage/VideosAdd/AddVideosPage')),
  },
  '/corporate/videos/:id': {
    component: loadable(() => import('pages/Apps/Corporate/VideosPage/VideosEdit/VideosEditPage')),
  },
  '/corporate/users': {
    component: loadable(() => import('pages/Apps/Corporate/UsersPage/UsersPage')),
  },
  '/corporate/users/new-user': {
    component: loadable(() => import('pages/Apps/Corporate/UsersPage/AddUser/AddUserPage')),
  },
  '/corporate/users/:id': {
    component: loadable(() => import('pages/Apps/Corporate/UsersPage/UsersEdit/UsersEditPage')),
  },
  '/corporate/reservations': {
    component: loadable(() => import('pages/Apps/Corporate/ReservationsPage/ReservationsPage')),
  },
  '/corporate/reservations/:id': {
    component: loadable(() => import('pages/Apps/Corporate/ReservationsPage/ReservationEdit/ReservationEditPage')),
  },
  '/corporate/trips': {
    component: loadable(() => import('pages/Apps/Corporate/TripsPage/TripsPage')),
  },
  '/corporate/user-transfer': {
    component: loadable(() => import('pages/Apps/Corporate/UserTransfer/UserTransferPage')),
  },
  '/corporate/certificates': {
    component: loadable(() => import('pages/Apps/Corporate/CertificatesPage/CertificatesPage')),
  },
  '/corporate/uploadcsv': {
    component: loadable(() => import('pages/Apps/Corporate/UploadCSV')),
  },

  '/gift/:uuid': {
    component: loadable(() => import('pages/Apps/Gift/GiftAcceptancePage')),
  },
  '/gift': {
    component: loadable(() => import('pages/Apps/Gift')),
  },
};

class Routes extends React.Component {
  timeoutId = null;

  componentDidMount() {
    this.timeoutId = setTimeout(
      () => Object.keys(loadableRoutes).forEach(path => loadableRoutes[path].component.preload()),
      5000 // load after 5 sec
    );
  }

  componentWillUnmount() {
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
    }
  }

  render() {
    return (
      <Switch>
        {/* <Route exact path="/" component={HomePage} /> */}
        {Object.keys(loadableRoutes).map(path => {
          const { exact, ...props } = loadableRoutes[path];
          props.exact = exact === void 0 || exact || false; // set true as default
          if (path.startsWith('/members')) {
            return <MemberRoute key={path} path={path} {...props} />;
          } else if (path.startsWith('/corporate')) {
            return <CorporateRoute key={path} path={path} {...props} />;
          } else if (path.startsWith('/affiliate')) {
            return <AffiliateRoute key={path} path={path} {...props} />;
          } else {
            return <Route key={path} path={path} {...props} />;
          }
        })}
        <Route render={() => <NotFoundPage />} />
      </Switch>
    );
  }
}

export { loadableRoutes };
export default Routes;
