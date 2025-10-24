import { render, screen } from "@testing-library/react";
import { BlogForm } from "./BlogForm";
import userEvent from "@testing-library/user-event";
import { expect, vi } from "vitest";

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const addBlog = vi.fn(); // Mock the addBlog function
  const user = userEvent.setup();

  render(<BlogForm addBlog={addBlog} />);

  // Get input elements
  const inputTitle = screen.getByLabelText("title:");
  const inputAuthor = screen.getByLabelText("author:");
  const inputUrl = screen.getByLabelText("url:");
  const sendButton = screen.getByText("save");

  // Simulate typing into the input fields
  await user.type(inputTitle, "testing a form...");
  await user.type(inputAuthor, "Tester");
  await user.type(inputUrl, "/testing/a/form");

  // Simulate clicking the save button
  await user.click(sendButton);

  // Ensure that addBlog has been called once
  expect(addBlog).toHaveBeenCalledTimes(1);

  // Extract the first call's event
  const formData = new FormData();
  formData.set("title", "testing a form...");
  formData.set("author", "Tester");
  formData.set("url", "/testing/a/form");

  // Instead of accessing form fields through event.target, check the formData values directly
  const formValues = Object.fromEntries(
    new FormData(addBlog.mock.calls[0][0].target),
  );

  // Ensure the form values are correct
  expect(formValues.title).toBe("testing a form...");
  expect(formValues.author).toBe("Tester");
  expect(formValues.url).toBe("/testing/a/form");
});
