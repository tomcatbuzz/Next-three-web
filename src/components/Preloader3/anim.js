export const opacity = {
  initial: {
      opacity: 1
  },
  exit: {
      opacity: 0.75,
      transition: {duration: 1, delay: 0.2}
  },
}


export const barStyles = {
  initial: {
    // opacity: 1
    width: "0%"
  }, 
  exit: {
    opacity: 0,
    transition: {duration: 6, delay: 0.2}
  },
  // start: {
  //   width: '10%',
  //   transition: {
  //     duration: 3, ease: 'easeInOut'
  //   }
  // },
  // middle: {
  //   width: '50%',
  //   transition: {
  //     duration: 3.2, ease: 'easeInOut'
  //   }
  // },
  // end: {
  //   width: '80%', 
  //   transition: {
  //     duration: 3.6, ease: 'easeInOut'
  //   }
  // }
  // indeterminate: {
  //   width: ['5%', '20%', '80%'],
  //   transition: {
  //     duration: 5.5, delay: 0.5,  ease: 'easeInOut'
  //   }
  // }
}