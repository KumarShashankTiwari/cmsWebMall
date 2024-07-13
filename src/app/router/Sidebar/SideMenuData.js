import { APP_CONSTANTS } from '../../constants/app-constants';
import * as RiIcons from 'react-icons/ri';
// import { userIcon } from '../../constants/image-constants';
import StoreIcon from '../../../assets/images/ic-ecommerce-delivery.svg';
import MallIcon from '../../../assets/images/ic-places-cinema.svg';
import userIcon from '../../../assets/images/ic-contact-browser.svg';

const SideMenuData = [
  {
    title: 'User Management',
    id: APP_CONSTANTS.USERS_TAG,
    to: APP_CONSTANTS.USERS,
    active: false,
    key: APP_CONSTANTS.USERS_TAG,
    icon: userIcon,
  },
  {
    title: 'Mall Management',
    id: APP_CONSTANTS.MALL_TAG,
    active: false,
    key: APP_CONSTANTS.MALL_TAG,
    icon: MallIcon,
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    subNav: [
      {
        title: 'Mall',
        id: APP_CONSTANTS.MALL_TAG,
        to: APP_CONSTANTS.MALL,
        active: false,
        key: APP_CONSTANTS.MALL_TAG,
      },
      {
        title: 'Banner',
        id: APP_CONSTANTS.MALL_BANNER_TAG,
        to: APP_CONSTANTS.MALL_BANNER,
        active: false,
        key: APP_CONSTANTS.MALL_TAG,
      },
      {
        title: 'Support Service',
        id: APP_CONSTANTS.SUPPORT_SERVICE_TAG,
        to: APP_CONSTANTS.SUPPORT_SERVICE,
        active: false,
        key: APP_CONSTANTS.MALL_TAG,
      },
    ],
  },
  {
    title: 'Store Management',
    id: APP_CONSTANTS.STORE_TAG,
    to: APP_CONSTANTS.STORE,
    active: false,
    key: APP_CONSTANTS.STORE_TAG,
    icon: StoreIcon,
  },
  // {
  //   title: 'Customer Management',
  //   id: APP_CONSTANTS.CUSTOMER_MANAGEMENT_TAG,
  //   to: APP_CONSTANTS.CUSTOMER_MANAGEMENT,
  //   active: false,
  //   key: APP_CONSTANTS.CUSTOMER_MANAGEMENT_TAG,
  //   icon: userIcon,
  // },
];

export default SideMenuData;
