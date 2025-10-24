import styled from "styled-components";

export const MenuStyle = styled.div`
  background-color: #eab676;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-family: Arial, sans-serif;

  div {
    display: inline;
  }

  a {
    margin-right: 15px;
    text-decoration: none;
    color: purple;
    font-weight: bold;

    &:hover {
      text-decoration: underline;
    }
  }

  span {
    margin-right: 15px;
  }

  button {
    background-color: darkgrey;
    border: 1px solid #252525;
    color: #252525;
    padding: 5px 10px;
    font-size: 14px;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      background-color: purple;
      color: white;
    }
  }
`;

export const BlogListStyle = styled.div`
  ul {
    list-style: none;
    margin: 1rem 0 0 0;
    padding: 0;

    li {
      border: 1px solid #252525;
      padding-top: 10px;
      padding-left: 2px;
      margin-bottom: 5px;
    }
  }
`;
