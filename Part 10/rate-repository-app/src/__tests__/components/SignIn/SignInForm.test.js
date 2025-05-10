import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import SignInForm from "../../../components/SignIn/SignInForm";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit function with correct arguments when a valid form is submitted", async () => {
      const onSubmit = jest.fn();
      render(<SignInForm onSubmit={onSubmit} />);

      fireEvent.changeText(screen.getByTestId("username"), "kalle");
      fireEvent.changeText(screen.getByTestId("password"), "password");
      fireEvent.press(screen.getByText("Sign In"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1);
        expect(onSubmit.mock.calls[0][0]).toEqual({
          username: "kalle",
          password: "password",
        });
      });
    });
  });
});
