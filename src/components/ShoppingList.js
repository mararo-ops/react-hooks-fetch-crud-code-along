import React, { useState ,useEffect} from "react";
import ItemForm from "./ItemForm";
import Filter from "./Filter";
import Item from "./Item";

function ShoppingList() {
  // adding a useeffect hook
      useEffect(()=>{
      fetch("http://localhost:4000/items")
      .then(resp =>resp.json())
      .then(data=>{
        console.log(data)
        setItems(data)
      })
      },[])
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [items, setItems] = useState([]);


  
  function handleAddItem(newItem) {
    console.log("In ShoppingList:", newItem);
  }

  function handleCategoryChange(category) {
    setSelectedCategory(category);
  }
  // add this callback function
  function handleDeleteItem(deletedItem) {
    const updatedItems = items.filter((item) => item.id !== deletedItem.id);
    setItems(updatedItems);
  }

  const itemsToDisplay = items.filter((item) => {
    if (selectedCategory === "All") return true;

    return item.category === selectedCategory;
  });

  return (
    <div className="ShoppingList">
      <ItemForm onAddItem={handleAddItem}/>
      <Filter
        category={selectedCategory}
        onCategoryChange={handleCategoryChange}
      />
      <ul className="Items">
        {itemsToDisplay.map((item) => (
          <Item key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
}

export default ShoppingList;