import { beforeAll, expect, rstest, test } from "@rstest/core";
import { render, screen } from "@testing-library/react";
import App from "../src/App";

beforeAll(() => {
  rstest.stubGlobal(
    "fetch",
    rstest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({}),
      }),
    ),
  );
});

test("renders the main page", async () => {
  const testMessage = "Borboletas Diurnas";
  render(<App />);
  expect(await screen.findByText(testMessage)).toBeInTheDocument();
});
