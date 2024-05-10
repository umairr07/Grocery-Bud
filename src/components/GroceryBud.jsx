import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import ReactDOM from "react-dom/client";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";
const getItemFromLocalStorage = () => {
  let grcItem = localStorage.getItem("groceryItem");
  if (grcItem) {
    return JSON.parse(localStorage.getItem("groceryItem"));
  } else {
    return [];
  }
};

const GroceryBud = () => {
  const [groceryItem, setGroceryItem] = useState(getItemFromLocalStorage());
  const [inputValue, setInputValue] = useState("");

  const handleAddItem = () => {
    if (inputValue === "") {
      toast.error("Add a grocery item", {
        position: "top-center",
        autoClose: 1500,
      });
      return;
    }

    const updateGroceryItem = [
      ...groceryItem,
      {
        inputValue,
        id: uuid(), //1       //2
        isChecked: false,
      },
    ];
    setGroceryItem(updateGroceryItem);
    console.log(inputValue, updateGroceryItem);
    setInputValue("");
    toast.success("Item added successfully", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const handleDeleteItems = (id) => {
    const deletGroceryItem = groceryItem.filter((item) => item.id !== id);
    setGroceryItem(deletGroceryItem);
    toast.success("Item deleted successfully", {
      position: "top-center",
      autoClose: 1500,
    });
  };

  const strikeItem = (id) => {
    const updateStrike = groceryItem.map((item) => {
      if (item.id === id) {
        item.isChecked = !item.isChecked;
      }
      return item;
    });

    setGroceryItem(updateStrike);
  };

  useEffect(() => {
    let setIntoLocalStorage = localStorage.setItem(
      "groceryItem",
      JSON.stringify(groceryItem)
    );
    console.log(setIntoLocalStorage);
  }, [groceryItem]);

  return (
    <div className="w-[40%] m-auto p-5 flex flex-col justify-center items-center mt-24 border-2  bg-[#fff] shadow-lg rounded-lg">
      <div>
        <h1 className="text-5xl font-bold">Grocery Bud</h1>
      </div>

      <div className="mt-10  p-2 w-[500px] flex justify-between">
        <input
          type="text"
          className="w-[400px] border-2 p-2"
          placeholder="Add a grocery item"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button
          className="bg-[#06B6D4] text-[#fff] p-2 w-[100px]"
          onClick={handleAddItem}
        >
          Add Item
        </button>
      </div>
      <div>
        {groceryItem.map((item, index) => {
          return (
            <div
              key={index}
              className="flex justify-between items-center w-[450px] mt-5"
            >
              <div className="flex gap-3 text-xl">
                <input
                  type="checkbox"
                  onChange={() => {
                    strikeItem(item.id);
                  }}
                  checked={item.isChecked}
                />
                <p className={item.isChecked ? "line-through" : "none"}>
                  {item.inputValue}
                </p>
              </div>

              <div className="flex gap-5 justify-center items-center">
                {/* <FiEdit
                  className="text-xl cursor-pointer "
                  onClick={() => editItems(item.id)}
                /> */}

                <RiDeleteBin6Line
                  className="text-2xl cursor-pointer"
                  onClick={() => handleDeleteItems(item.id)}
                />
              </div>
            </div>
          );
        })}
      </div>

      <ToastContainer />
    </div>
  );
};

export default GroceryBud;
