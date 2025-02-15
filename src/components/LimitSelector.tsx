interface LimitSelectorProps {
  value: number;
  onChange: (limit: number) => void;
}

function LimitSelector({ value, onChange }: LimitSelectorProps) {
  return (
    <select value={value} onChange={(e) => onChange(Number(e.target.value))}>
      <option value={10}>10 per page</option>
      <option value={20}>20 per page</option>
      <option value={30}>30 per page</option>
      <option value={50}>50 per page</option>
    </select>
  );
}

export default LimitSelector;
