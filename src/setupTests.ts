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
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).$ = mockJQuery;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(global as any).jQuery = mockJQuery;
