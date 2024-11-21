import { ProductsType as ProductsProps } from "../types/ItemsType";

const Products = ({ name, imagePath, updateItemCount }: ProductsProps) => {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const curValue = e.target.value
    updateItemCount(name, parseInt(curValue))
  }

  return (
    <div style={{ display:'flex', flexDirection: 'column' }}>
      <img style={{ width: "75%", marginBottom: '7px'}} src={`http://localhost:4000/${imagePath}`} alt={`${name} product`} />
      <form style={{display: "flex", width: '75%',}} action="">
        <label style={{ textAlign: "right" }} htmlFor="">
          {name}
        </label>
        <input
          style={{ marginLeft: "7px" }}
          type="number"
          name="quantity"
          min="0"
          defaultValue="0"
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default Products;
