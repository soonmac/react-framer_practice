import React, { useState } from "react";
import styled from "styled-components";
import {
  AnimatePresence,
  motion,
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
const Overlay = styled(motion.div)`
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Box = styled(motion.div)`
  height: 200px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  background-color: white;
  border-radius: 20px;
  transform-origin: top left;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

const Grid = styled.div`
  width: 50vw;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
`;
const Btn = styled(motion.button)`
  padding: 1em;
  color: "blue";
`;
const Circle = styled(motion.div)`
  background-color: #00a5ff;
  height: 50px;
  width: 50px;
  border-radius: 50%;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
`;

// animation
const btnAni = {
  hover: { scale: 1.1, color: "red" },
  click: { scale: 1, color: "blue" },
};
const boxAni = {
  hover: (id: null | string) => ({
    scale: 1.05,
    transformOrigin: id
      ? parseInt(id) === 4
        ? "top left"
        : parseInt(id) === 3
        ? "top right"
        : parseInt(id) === 2
        ? "bottom left"
        : "bottom right"
      : undefined,
  }),
};

// render
function App() {
  const [id, setId] = useState<null | string>(null);
  const [isHover, setIsHover] = useState<null | string>(null);
  const [clicked, setClicked] = useState(false);
  const toggleClicked = () => setClicked((prev) => !prev);
  return (
    <Wrapper>
      <AnimatePresence custom={isHover}>
        <Grid>
          {["1", "2", "3", "4"].map((n, index) => (
            <Box
              onClick={() => {
                setId(n);
              }}
              key={n}
              layoutId={n}
              variants={boxAni}
              whileHover="hover"
              onHoverStart={() => {
                setIsHover(n);
              }}
              onHoverEnd={() => {
                setIsHover(null);
              }}
              custom={isHover}
            >
              {index === 1 ? (
                !clicked ? (
                  <Circle layoutId="circle" />
                ) : null
              ) : null}
              {index === 2 ? (
                clicked ? (
                  <Circle layoutId="circle" />
                ) : null
              ) : null}
            </Box>
          ))}
        </Grid>
        {id ? (
          <Overlay
            onClick={() => setId(null)}
            initial={{ backgroundColor: " rgba(0, 0, 0, 0)" }}
            animate={{ backgroundColor: " rgba(0, 0, 0, 0.8)" }}
            exit={{ backgroundColor: " rgba(0, 0, 0, 0)" }}
          >
            <Box layoutId={id} style={{ width: 400, height: 200 }} />
          </Overlay>
        ) : null}
      </AnimatePresence>
      <Btn
        variants={btnAni}
        whileHover="hover"
        whileTap="click"
        onClick={toggleClicked}
      >
        Switch
      </Btn>
    </Wrapper>
  );
}

export default App;
