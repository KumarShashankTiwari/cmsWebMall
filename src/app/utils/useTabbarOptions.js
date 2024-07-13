import { MyContext } from 'app/context/MyContext';
import { useContext } from 'react';

const useTabBarOptions = () => {
  const { languages = [] } = useContext(MyContext);

  const LanguageOptions = [...languages];
  return {
    LanguageOptions,
  };
};

export default useTabBarOptions;
