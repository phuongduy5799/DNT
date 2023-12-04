// ScrollAnimation.js
import React from 'react';
import { useAnimation } from 'framer-motion';
import VisibilitySensor from 'react-visibility-sensor';

export function useScrollAnimation() {
  const controls = useAnimation();
  const [ref, setRef] = React.useState(null);

  const onVisibilityChange = (isVisible) => {
    if (isVisible) {
      controls.start('visible');
    }
  };

  return [ref, setRef, controls, onVisibilityChange];
}

export function ScrollAnimation({ children }) {
  const [ref, setRef, controls, onVisibilityChange] = useScrollAnimation();

  return (
    <VisibilitySensor onChange={onVisibilityChange} partialVisibility minTopValue={50}>
      <motion.div
        ref={setRef}
        animate={controls}
        initial="hidden"
        variants={{
          visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.5 },
          },
          hidden: { opacity: 0, y: 50 },
        }}
      >
        {children}
      </motion.div>
    </VisibilitySensor>
  );
}