import { OptionsType as OptionsProps } from "../types/ItemsType";

const Options = ({ name, updateItemCount }: OptionsProps) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curValue = e.target.checked ? 1 : 0
    updateItemCount(name, curValue)
  }

  return (
    <form>
      <input type="checkbox" id={`${name} option`} onChange={handleChange}></input>
      <label htmlFor={`${name} option`}>{name}</label>
    </form>
  );
};

export default Options;
