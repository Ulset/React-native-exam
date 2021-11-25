import { useState } from 'react';

export const useRefetchQuery = (refetch: () => Promise<unknown>) => {
  //Custom hook for handling refreshes in ScrollViews
  const [isRefetching, setIsRefetching] = useState(false);
  const doRefresh = async () => {
    setIsRefetching(true);
    await refetch();
    setTimeout(() => {
      //I originally added this to debug, but i honestly think it looks bad when the refresh icon in the screens
      // go away so fast, so im keeping it :-)
      setIsRefetching(false);
    }, 600);
  };
  return { isRefetching, doRefresh };
};
