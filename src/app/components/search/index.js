import React from 'react';
import PropTypes from 'prop-types';
import NewInput from '../../components/NewInput';

import searchImg from '../../../assets/images/search-1.png';
import './index.scss';

const Search = (props) => {
  const { value, placeholder, className, onChange } = props;
  return (
    <div className='search-wrap'>
    <label>Search</label>
    <div className={`searchBar ${className}`}>      
      <NewInput
        id='search'
        type='text'
        placeholder={placeholder}
        name='ctaTitle'
        value={value}
        className={`textInput ${className}`}
        onChange={(e) => {
          onChange && onChange(e.target.value);
        }}
      />
      <img className='searchBar__searchIcon' src={searchImg} alt='searchIcon' />
    </div>
    </div>
  );
};
Search.propTypes = {
  className: PropTypes.string,
  value: PropTypes.string,
  placeholder: PropTypes.string,
};

Search.defaultProps = {
  className: '',
  value: '',
  placeholder: 'Search',
  onChange: '',
  clearTextHandler: '',
};

export default React.memo(Search);
