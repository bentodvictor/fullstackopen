import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import Todo from "../Todos/Todo";

describe("Todo Component", () => {
  const mockDeleteTodo = jest.fn();
  const mockCompleteTodo = jest.fn();

  const baseTodo = { text: "Learn React", done: false };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders todo text", () => {
    render(
      <Todo
        todo={baseTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    expect(screen.getByText("Learn React")).toBeInTheDocument();
  });

  test("shows correct info when todo is not done", () => {
    render(
      <Todo
        todo={baseTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    expect(screen.getByText("This todo is not done")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.getByText("Set as done")).toBeInTheDocument();
  });

  test("shows correct info when todo is done", () => {
    render(
      <Todo
        todo={{ ...baseTodo, done: true }}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    expect(screen.getByText("This todo is done")).toBeInTheDocument();
    expect(screen.getByText("Delete")).toBeInTheDocument();
    expect(screen.queryByText("Set as done")).not.toBeInTheDocument();
  });

  test("calls deleteTodo when Delete button is clicked", () => {
    render(
      <Todo
        todo={baseTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    fireEvent.click(screen.getByText("Delete"));
    expect(mockDeleteTodo).toHaveBeenCalledTimes(1);
    expect(mockDeleteTodo).toHaveBeenCalledWith(baseTodo);
  });

  test("calls completeTodo when Set as done button is clicked", () => {
    render(
      <Todo
        todo={baseTodo}
        deleteTodo={mockDeleteTodo}
        completeTodo={mockCompleteTodo}
      />
    );

    fireEvent.click(screen.getByText("Set as done"));
    expect(mockCompleteTodo).toHaveBeenCalledTimes(1);
    expect(mockCompleteTodo).toHaveBeenCalledWith(baseTodo);
  });
});
