import "@testing-library/jest-dom";

// Mock jQuery globally for components that use $ in useEffect
const mockJQuery = Object.assign(
  (_selector: string) => ({
    popover: jest.fn(),
    modal: jest.fn(),
  }),
  {
    fn: {},
  }
);
(global as any).$ = mockJQuery;
(global as any).jQuery = mockJQuery;
