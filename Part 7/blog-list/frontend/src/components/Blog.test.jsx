import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";
import { beforeEach, describe, expect, vi } from "vitest";

describe("Blog", async () => {
  const blog = {
    title: "Test blog",
    author: "Test author",
    url: "http://test.com",
    likes: 10,
    user: {
      username: "test username",
      name: "test name",
    },
  };

  const handleLike = vi.fn();
  const deleteBlog = vi.fn();

  beforeEach(() => {
    render(
      <Blog blog={blog} handleLike={handleLike} deleteBlog={deleteBlog} />,
    );
  });

  test("renders title and author, but not url and likes by default", () => {
    expect(screen.getByText(blog.title)).toBeInTheDocument();
    expect(screen.getByText(blog.author)).toBeInTheDocument();
    expect(screen.queryByText(blog.url)).not.toBeInTheDocument();
    expect(
      screen.queryByText("likes", { exact: false }),
    ).not.toBeInTheDocument();
  });

  test('shows URL and likes when "show" button is clicked', async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show", { exact: false });
    await user.click(button);

    expect(screen.getByText(blog.url)).toBeInTheDocument();
    expect(screen.getByText("likes", { exact: false })).toBeInTheDocument();
  });

  test('calls event handler twice when "like" button is clicked twice', async () => {
    const user = userEvent.setup();
    const viewButton = screen.getByText("show", { exact: false });
    await user.click(viewButton);

    const likeButton = screen.getByText("add like", { exact: false });
    await user.click(likeButton);
    await user.click(likeButton);

    expect(handleLike.mock.calls).toHaveLength(2);
  });
});
