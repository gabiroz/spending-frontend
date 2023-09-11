import {useEffect, useState} from "react";
import axios from "axios";
import {List} from "./List/List";
import {Filter} from "./Filter/Filter";
import {Form} from "./Form/Form";
import "./App.css";

const API_URL = 'https://shielded-depths-43687-bb049deacd16.herokuapp.com'

function App() {
  const [currency, setCurrency] = useState("HUF");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const [invalidAmount, setInvalidAmount] = useState(false);
  const [invalidDescription, setInvalidDescription] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [modifiedItem, setModifiedItem] = useState(null);
  const [sorting, setSorting] = useState("-spent_at");
  const [currencyFilter, setCurrencyFilter] = useState(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/spendings/`,
          {
            params: {
              order: sorting,
              currency: currencyFilter,
            },
          }
        );
        setItems(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchItems();
  }, [sorting, currencyFilter, modifiedItem]);

  const handleOptionChange = (event) => {
    setSorting(event.target.value);
  };

  const toggleCurrency = () => {
    setCurrency((prevCurrency) => (prevCurrency === "HUF" ? "USD" : "HUF"));
  };

  const filterCurrency = (currency) => {
    setCurrencyFilter(currency);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
    setInvalidDescription(false)
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setInvalidAmount(false);
  };

  const handleEdit = (item) => {
    setAmount(item.amount);
    setSelectedId(item.id);
    setDescription(item.description);
    setCurrency(item.currency);
  };

  const clearForm = () => {
    setAmount(0);
    setSelectedId(null);
    setDescription("");
  };

  const updateItem = async (data) => {
    try {
      await axios.put(
        `${API_URL}/spendings/${selectedId}/`,
        data
      );
    } catch (error) {
      console.error(error);
    }
  };

  const validateInputs = () => {
    if(!amount)  setInvalidAmount(true)
    if(!description)  setInvalidDescription(true)
    return(!!amount && !!description)
  }

  const handleSave = async () => {
    if(validateInputs()) {
      const data = {
        description,
        amount,
        currency,
        spent_at: new Date().toISOString(),
      };
      if (selectedId) {
        await updateItem(data);
        setSelectedId(null);
      } else {
        try {
          await axios.post(
            `${API_URL}/spendings/`,
            data
          );
        } catch (error) {
          console.error(error);
        }
      }
      clearForm();
      setModifiedItem(data);
    }
  };

  const handleDelete = async (item) => {
    try {
      await axios.delete(
        `${API_URL}/spendings/${item.id}/`
      );
    } catch (error) {
      console.error(error);
    }
    setModifiedItem(item);
  };

  return (
    <div className="Wrapper">
      <Form
        description={description}
        amount={amount}
        handleDescriptionChange={handleDescriptionChange}
        handleAmountChange={handleAmountChange}
        currency={currency}
        toggleCurrency={toggleCurrency}
        handleSave={handleSave}
        invalidAmount={invalidAmount}
        invalidDescription={invalidDescription}
      />

      <Filter
        sorting={sorting}
        handleOptionChange={handleOptionChange}
        currencyFilter={currencyFilter}
        filterCurrency={filterCurrency}
      />

      <List
        items={items}
        handleEdit={handleEdit}
        handleDelete={handleDelete}
      />
    </div>
  );
}

export default App;
