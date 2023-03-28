import React, { useState } from 'react';
import { FaArrowCircleUp } from 'react-icons/fa';
import { Button } from './Styles';

const ScrollButton = () => {
  const [visible, setVisible] = useState(false);

  const toggleVasible = () => {
    const scrolled = document.documentElement.scrollTop;

    if (scrolled > 100) setVisible(true);
    else if (scrolled <= 100) setVisible(false);
  };

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  window.addEventListener('scroll', toggleVasible);
  return (
    <Button>
      <FaArrowCircleUp onClick={scrollTop} style={{ display: visible ? 'inline' : 'none' }} />
    </Button>
  );
};

export default ScrollButton;
