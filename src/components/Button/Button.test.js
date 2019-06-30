import React from "react";
import ReactDOM from "react-dom";
import renderer from "react-test-renderer";

import Button from "./Button";

describe("Button", () => {
  it("renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<Button>Do Somethings</Button>, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  test("should have valid snapshot", () => {
    const component = renderer.create(<Button>Do Somethings</Button>);
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
