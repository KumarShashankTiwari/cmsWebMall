import React, { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import SideMenuData from './SideMenuData';
import './index.scss';
import { APP_CONSTANTS } from '../../constants/app-constants';

const Sidebar = () => {
  const location = useLocation();
  const [data, setData] = useState(SideMenuData);
  const activeItemRef = useRef(null);

  const intialValue = [
    APP_CONSTANTS.USERS_TAG,
    APP_CONSTANTS.MALL_TAG,
    APP_CONSTANTS.VOUCHER_TAG,
    APP_CONSTANTS.STORE_TAG,
    APP_CONSTANTS.TIER_TAG,
    APP_CONSTANTS.OFFER_DEALS_TAG,
    APP_CONSTANTS.REWARDS_TAG,
    APP_CONSTANTS.BILL_VALIDATION_TAG,
    APP_CONSTANTS.ANALYTICS_TAG,
    APP_CONSTANTS.CUSTOMER_MANAGEMENT_TAG,
  ];

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [location.pathname]);

  const handleSubMenuClick = (itemId) => {
    const updatedData = data.map((item) => {
      if (item.id === itemId) {
        item.active = !item.active;
      } else {
        item.active = false;
      }
      return item;
    });

    setData(updatedData);
  };

  return (
    <nav className='sidebar'>
      <ul className='sidebar-list list-unstyled m-0'>
        {data.map((item, index) => {
          return (
            intialValue?.includes(item.key) && (
              <React.Fragment key={index}>
                <li
                  ref={(ref) => {
                    if (location.pathname === item.to) {
                      activeItemRef.current = ref;
                    }
                  }}
                  className={`sidebar-item ${
                    location.pathname === item.to ? 'active-item' : ''
                  }`}
                >
                  <Link
                    to={item.to}
                    className={`${
                      location.pathname === item.to ? 'active ' : ''
                    }`}
                    onClick={() => handleSubMenuClick(item.id)}
                  >
                    <img
                      className={`${
                        location.pathname === item.to ? 'active ' : ''
                      }`}
                      src={item.icon}
                      alt={`${item.title} icon`}
                      // className='sidebar-icon'
                    />
                    {item.title}
                    {item.subNav && (
                      <span className='sidebar-arrow'>
                        {item.active ? item.iconOpened : item.iconClosed}
                      </span>
                    )}
                  </Link>
                </li>
                {item.subNav && item.active && (
                  <ul className='sub-menu p-0 m-0'>
                    {item.subNav.map((subItem, subIndex) => (
                      <li
                        key={subIndex}
                        ref={(ref) => {
                          if (location.pathname === subItem.to) {
                            activeItemRef.current = ref;
                          }
                        }}
                      >
                        <Link
                          to={subItem.to}
                          className={`sub-menu-link ${
                            location.pathname === subItem.to
                              ? 'active active-item'
                              : ''
                          }`}
                        >
                          {subItem.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </React.Fragment>
            )
          );
        })}
      </ul>
    </nav>
  );
};

export default Sidebar;
