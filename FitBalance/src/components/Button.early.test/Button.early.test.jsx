import React from "react";
import Button from "../Button";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
//gg
describe("Button() Button method", () => {
  // Happy Path Tests
  describe("Happy Paths", () => {
    it("should render the button with the correct text", () => {
      // Test to ensure the button renders with the correct tag text
      const tag = "Click Me";
      render(<Button tag={tag} />);
      expect(screen.getByRole("button")).toHaveTextContent(tag);
    });

    it("should apply the correct background and text colors", () => {
      // Test to ensure the button applies the correct styles
      const bgCol = "blue";
      const textCol = "white";
      render(<Button bgCol={bgCol} textCol={textCol} />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle(`background-color: ${bgCol}`);
      expect(button).toHaveStyle(`color: ${textCol}`);
    });

    it("should call the onClick handler when clicked", () => {
      // Test to ensure the onClick handler is called when the button is clicked
      const onClick = jest.fn();
      render(<Button onClick={onClick} />);
      fireEvent.click(screen.getByRole("button"));
      expect(onClick).toHaveBeenCalledTimes(1);
    });

    it("should apply the correct margin-top when mt is provided", () => {
      // Test to ensure the button applies the correct margin-top style
      const mt = 10;
      render(<Button mt={mt} />);
      expect(screen.getByRole("button")).toHaveStyle(`margin-top: ${mt}px`);
    });
  });

  // Edge Case Tests
  describe("Edge Cases", () => {
    it("should render with default margin-top when mt is not provided", () => {
      // Test to ensure the button defaults to 0 margin-top when mt is not provided
      render(<Button />);
      expect(screen.getByRole("button")).toHaveStyle("margin-top: 0");
    });

    it("should handle missing onClick handler gracefully", () => {
      // Test to ensure the button does not throw an error when clicked without an onClick handler
      render(<Button />);
      fireEvent.click(screen.getByRole("button"));
      // No assertion needed as we're checking for absence of errors
    });

    it("should render with default colors when bgCol and textCol are not provided", () => {
      // Test to ensure the button renders with default colors when none are provided
      render(<Button />);
      const button = screen.getByRole("button");
      expect(button).toHaveStyle("background-color: ButtonFace"); // Default button color
      expect(button).toHaveStyle("color: ButtonText"); // Default text color
    });

    it("should render correctly with empty string as tag", () => {
      // Test to ensure the button renders correctly with an empty string as tag
      render(<Button tag="" />);
      expect(screen.getByRole("button")).toHaveTextContent("");
    });
  });
});
