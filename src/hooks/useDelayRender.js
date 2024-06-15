import { useState, useEffect } from 'react';

const useDelayRender = (delayTime = 1000) => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, delayTime);

    return () => clearTimeout(timer);
  }, [delayTime]);

  return shouldRender;
};

export default useDelayRender;