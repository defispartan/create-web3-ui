import useRootStore from "../store/rootStore.ts";

const ActiveChain = () => {
  const [activeChain, availableChains, setActiveChain] = useRootStore(
    (state) => [state.activeChain, state.availableChains, state.setActiveChain]
  );

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedChain = availableChains.find(
      (chain) => chain.id.toString() === event.target.value
    );
    if (selectedChain) {
      setActiveChain(selectedChain);
    }
  };

  return (
    <div className="panel-full">
      <h1>Active Chain</h1>
      <select
        className="chain-selector"
        value={activeChain.id}
        onChange={handleChange}
      >
        {availableChains.map((chain, index) => (
          <option key={index} value={chain.id}>
            {chain.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default ActiveChain;
