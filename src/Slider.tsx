import React, { useState } from "react";
import styled from "styled-components";
import {
    AnimatePresence,
    motion,
    useMotionValue,
    useTransform,
    useViewportScroll,
  } from "framer-motion";
  
  // style
  const Wrapper = styled(motion.div)`
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background: linear-gradient(135deg, rgb(238, 0, 153), rgb(221, 0, 238));
  `;
  
  const Box = styled(motion.div)`
    position: absolute;
    top: 100px;
    width: 400px;
    height: 200px;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    background-color: white;
    border-radius: 20px;
    box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
  `;
  
  // animation
  const boxVariants = {
    entry: (back: boolean) => ({
      x: back ? -500 : 500,
      opacity: 0,
      scale: 0,
    }),
    center: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
    exit: (back: boolean) => ({
      x: back ? 500 : -500,
      opacity: 0,
      scale: 0,
      transition: { duration: 0.5 },
    }),
  };
  
  // render
  function Slider() {
    const [visible, setVisible] = useState(1);
    const [back, setBack] = useState(false);
    const nextPlease = () => {
      setBack(false);
      setVisible((prev) => (prev === 10 ? 10 : prev + 1));
    };
    const prevPlease = () => {
      setBack(true);
      setVisible((prev) => (prev === 1 ? 1 : prev - 1));
    };
    return (
      <Wrapper>
        <AnimatePresence custom={back}>
          <Box
            custom={back}
            variants={boxVariants}
            initial="entry"
            animate="center"
            exit="exit"
            key={visible}
          >
            {visible}
          </Box>
        </AnimatePresence>
        <button onClick={prevPlease}>prev</button>
        <button onClick={nextPlease}>next</button>
      </Wrapper>
    );
  }
  
  export default Slider;