interface TodoNumberLabelProps {
  sequence: number;
}

const LABEL_COLORS = [
  "orange",
  "red",
  "skyblue",
  "blue",
  "green",
  "gray",
  "orangered",
];

export const TodoNumberLabel = (props: TodoNumberLabelProps) => {
  const { sequence } = props;

  const getRandomColor = (min: number, max: number): string =>
    LABEL_COLORS[Math.floor(Math.random() * (max - min)) + min];

  return (
    <div
      className="todo-number-label"
      style={{ backgroundColor: getRandomColor(0, LABEL_COLORS.length) }}
    >
      {sequence}
    </div>
  );
};
