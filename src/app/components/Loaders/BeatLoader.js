import React from 'react';
import BeatLoader from 'react-spinners/BeatLoader';

const BeatLoaderComponent = (props) => {
  return <BeatLoader size={props.size ? props.size : 16} color={'#92b852'} />;
};

export default BeatLoaderComponent;
