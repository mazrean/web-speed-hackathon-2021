import React from 'react';

import { NotFoundPage } from '../../components/application/NotFoundPage';

/** @type {React.VFC} */
const NotFoundContainer = () => {
  React.useEffect(() => {
    document.title = '読込中 - CAwitter'
  }, [])

  return (
    <>
      <NotFoundPage />
    </>
  );
};

export { NotFoundContainer };
