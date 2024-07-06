import { useState, useEffect } from 'react';

// const useMediaQuery = (query) => {
//   const [matches, setMatches] = useState(
//     () => window.matchMedia(query).matches
//   );

//   useEffect(() => {
//     if (typeof window !== 'undefined') {
//       const mediaQuery = window.matchMedia(query);
//     const handleChange = (e) => setMatches(e.matches);
//     mediaQuery.addEventListener('change', handleChange);
//     return () => {
//       mediaQuery.removeEventListener('change', handleChange);
//     };
//   }
//   }, [query]);
// }
//   return matches;
//   };

const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    // Check if the window object is available
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia(query);
      setMatches(mediaQuery.matches);

      const handleChange = (e) => setMatches(e.matches);
      mediaQuery.addEventListener('change', handleChange);

      return () => {
        mediaQuery.removeEventListener('change', handleChange);
      };
    }
  }, [query]);

  return matches;
};
    


export default useMediaQuery;