interface EhrePointsProps {
  amount: number;
  showPlus?: boolean;
}

function EhrePoints({ amount, showPlus = false }: EhrePointsProps) {
  return (
    <span
      className={`ml-auto font-medium ${
        amount <= 0 ? "text-destructive" : ""
      } ${showPlus && amount > 0 ? "text-green-700" : ""}`}
    >
      {showPlus && amount > 0 && "+"}
      {amount}
    </span>
  );
}

export default EhrePoints;
