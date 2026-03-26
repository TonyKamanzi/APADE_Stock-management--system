import axios from "axios"
export default function AddItem() {
    const fectchCategories = async () => {
        try {
            await axios.get("http://localhost:5000/category/")
        } catch (error) {
            console.error(error);
            
        }
    }
  return (
    <div>
      <form>
        <div>
          <input type="text" name="name" id="name" placeholder="Name of item" />
        </div>
        <div>
          <input type="number" name="unit" id="unit" placeholder="Item Unit" />
          <select name="unit" id="unit">
            <option value="">select unit</option>
            <option value="pcs">Pieces</option>
            <option value="kg">Kg</option>
            <option value="g">Gram</option>
            <option value="l">Liter</option>
          </select>
        </div>
        <div>
          <input type="text" name="description" id="description" />
        </div>
      </form>
    </div>
  );
}
