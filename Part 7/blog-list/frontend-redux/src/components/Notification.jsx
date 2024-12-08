import { useSelector } from "react-redux";

export const Notification = () => {
  const noty = useSelector((state) => state.noty);

  if (!noty) {
    return <></>;
  }

  const color = noty?.type === "error" ? "red" : "green";
  return (
    <div>
      <p
        style={{
          textTransform: "uppercase",
          color: color,
          fontWeight: "bold",
          border: `4px solid ${color}`,
          padding: "10px",
        }}
      >
        {noty?.message}
      </p>
    </div>
  );
};
