import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Carousel from "./Carousel";

it('should render', () => {
  render(<Carousel/>)
})

it('should match snapshot', () => {
  const { asFragment } = render(<Carousel />)
  expect(asFragment()).toMatchSnapshot()
})

it("works when you click on the right arrow", function() {
  const { queryByTestId, queryByAltText } = render(<Carousel />);

  // expect the first image to show, but not the second
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).not.toBeInTheDocument();

  // move forward in the carousel
  const rightArrow = queryByTestId("right-arrow");
  fireEvent.click(rightArrow);

  // expect the second image to show, but not the first
  expect(queryByAltText("Photo by Richard Pasquarella on Unsplash")).not.toBeInTheDocument();
  expect(queryByAltText("Photo by Pratik Patel on Unsplash")).toBeInTheDocument();
});

it('works when you click on the left arrow', function () {
  const { queryByTestId, queryByAltText } = render(<Carousel />)

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument()
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument()

  // move forward in the carousel
  const rightArrow = queryByTestId('right-arrow')
  fireEvent.click(rightArrow)

  // expect the second image to show, but not the first
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).not.toBeInTheDocument()
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).toBeInTheDocument()

  // move backward in the carousel
  const leftArrow = queryByTestId('left-arrow')
  fireEvent.click(leftArrow)

  // expect the first image to show, but not the second
  expect(
    queryByAltText('Photo by Richard Pasquarella on Unsplash')
  ).toBeInTheDocument()
  expect(
    queryByAltText('Photo by Pratik Patel on Unsplash')
  ).not.toBeInTheDocument()
})

it('should not have the left arrow on load', () => {
  const { queryByTestId } = render(<Carousel />)

  const leftArrow = queryByTestId('left-arrow')
  expect(leftArrow).toEqual(null)
})

it('should have the right arrow on load (first card)', () => {
  const { queryByTestId } = render(<Carousel />)

  const rightArrow = queryByTestId('right-arrow')
  expect(rightArrow).not.toEqual(null)
})

it('should have the right and left arrow when not at beginning or end', () => {
  const { queryByTestId } = render(<Carousel />)

  fireEvent.click(queryByTestId('right-arrow'))
  const rightArrow = queryByTestId('right-arrow')
  const leftArrow = queryByTestId('left-arrow')

  expect(rightArrow).not.toEqual(null)
  expect(leftArrow).not.toEqual(null)
})

it('should not have the right arrow when at the end', () => {
  const { queryByTestId } = render(<Carousel />)

  // Shift through the carousel to the last card.
  fireEvent.click(queryByTestId('right-arrow'))
  fireEvent.click(queryByTestId('right-arrow'))
  
  // Get arrows for testing
  const rightArrow = queryByTestId('right-arrow')
  const leftArrow = queryByTestId('left-arrow')

  // Check for arrows
  expect(rightArrow).toEqual(null)
  expect(leftArrow).not.toEqual(null)
})