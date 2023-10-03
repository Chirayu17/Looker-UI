import { Button } from "@mui/material";
import React, { MouseEventHandler } from "react";

const ContainerButton = ({
  text,
  fullWidth,
  isDisabled,
  handleButtonPress,
}: {
  text: string;
  fullWidth: boolean;
  isDisabled: boolean;
  handleButtonPress: MouseEventHandler<HTMLButtonElement>;
}) => {
  return (
    <Button
      variant="contained"
      fullWidth={fullWidth}
      disabled={isDisabled}
      onClick={handleButtonPress}
    >
      {text}
    </Button>
  );
};

ContainerButton.defaultProps = {
  fullWidth: false,
  isDisabled: false,
  handleButtonPress: (event: MouseEvent) => {
    console.log("Button Clicked!");
  },
};
export default ContainerButton;
