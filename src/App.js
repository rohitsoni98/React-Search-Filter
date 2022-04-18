import { useState, useEffect, useMemo, useCallback } from "react";

const App = () => {
  // our states
  const [state, setState] = useState({
    name: "",
    user: "",
    email: "",
    phone: "",
    item: [],
    showUpdate: false,
    showAdd: true
  });

  const [submitBtn, setSubmitBtn] = useState(false);

  const [update, setUpdate] = useState({
    Name: "",
    UserName: "",
    Email: "",
    Phone: "",
    id: ""
  });

  // debouncing function
  // const debounce = (func) => {
  //   let timer;
  //   return function (...args) {
  //     const context = this;
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       timer = null;
  //       func.apply(context, args);
  //     }, 2000);
  //   };
  // };

  // fetching api through axios
  useEffect(() => {
    const fetchData = () => {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then((resp) => resp.json())
        .then((itm) => {
          setState((prevState) => ({ ...prevState, item: itm }));
        });
    };
    fetchData();
  }, []);

  const FilterItem = useMemo(() => {
    return state.item.filter((item) => {
      if (
        state.name === "" &&
        state.user === "" &&
        state.email === "" &&
        state.phone === ""
      ) {
        return item;
      } else if (
        item.name.toLowerCase().includes(state.name.toLocaleLowerCase()) &&
        item.username.toLowerCase().includes(state.user.toLocaleLowerCase()) &&
        item.email.toLowerCase().includes(state.email.toLocaleLowerCase()) &&
        item.phone.includes(state.phone)
      ) {
        return item;
      }
    });
  }, [state, state.name, state.user, state.email, state.phone]);

  const handleEvent = (e) => {
    const value = e.target.value;
    const id = e.target.id;
    setState((preState) => ({ ...preState, [id]: value }));
  };

  // const optimizedFn = useCallback(debounce(handleEvent), []);

  const handleCLick = (val) => {
    setUpdate({
      id: val.id,
      Name: val.name,
      UserName: val.username,
      Email: val.email,
      Phone: val.phone,
    });
    setSubmitBtn(true);
    setState((prevState) => ({ ...prevState, showUpdate: true, showAdd: false }))
  };

  const AddBtn = () => {
    let newList = state.item;
    newList.push({ name: update.Name, username: update.UserName, email: update.Email, phone: update.Phone })
    setState((prev) => ({ ...prev, item: newList, showUpdate: false, showAdd: true }))
    setUpdate({
      Name: "",
      UserName: "",
      Email: "",
      Phone: "",
      id: ""
    })
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    let newList = state.item.map((items) => {
      if (items.id === update.id) {
        return { ...items, name: update.Name, username: update.UserName, email: update.Email, phone: update.Phone }
      }
      else {
        return items
      }
    })
    setState((prev) => ({ ...prev, item: newList, showUpdate: false, showAdd: true }))
    setSubmitBtn(false);
    setUpdate({
      Name: "",
      UserName: "",
      Email: "",
      Phone: "",
      id: ""
    })
  };

  // returning jsx
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>
        Search Filter Application in React
      </h1>
      <div className="table">
        <table>
          <thead>
            <tr className="tableHeading">
              <th>
                Name
                <br></br>
                <input
                  type="search"
                  id="name"
                  placeholder="Search..."
                  value={state.name}
                  onChange={handleEvent}
                />
              </th>
              <th>
                User Name
                <br></br>
                <input
                  type="search"
                  id="user"
                  placeholder="Search..."
                  value={state.user}
                  onChange={handleEvent}
                />
              </th>
              <th>
                Email
                <br></br>
                <input
                  type="search"
                  id="email"
                  placeholder="Search..."
                  value={state.email}
                  onChange={handleEvent}
                />
              </th>
              <th>
                Phone
                <br></br>
                <input
                  type="search"
                  id="phone"
                  placeholder="Search..."
                  value={state.phone}
                  onChange={handleEvent}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {FilterItem.map((val, index) => {
              return (
                <tr
                  className="tableItem"
                  key={index}
                  style={{ textAlign: "center", cursor: "pointer" }}
                  onClick={() => handleCLick(val)}
                >
                  <td >{val.name}</td>
                  <td >{val.username}</td>
                  <td >{val.email}</td>
                  <td >{val.phone}</td>
                  {/* <td>
                    <button style={{ padding: "5px", borderRadius: "5px", cursor: "pointer" }}>
                      Edit
                    </button>
                  </td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {
        state.showUpdate &&
        <div className="updateBox">
          <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
            Update Item / Add Item
          </h1>
          <form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            Name:
            <input
              type="text"
              value={update.Name}
              onChange={(e) => setUpdate((preState) => ({ ...preState, Name: e.target.value }))}
            />
            User Name:
            <input
              type="text"
              value={update.UserName}
              onChange={(e) =>
                setUpdate((preState) => ({ ...preState, UserName: e.target.value }))
              }
            />
            Email:
            <input
              type="email"
              value={update.Email}
              onChange={(e) => setUpdate((preState) => ({ ...preState, Email: e.target.value }))}
            />
            Phone:
            <input
              type="text"
              value={update.Phone}
              onChange={(e) => setUpdate((preState) => ({ ...preState, Phone: e.target.value }))}
            />
            {
              submitBtn ?
                <button type="submit">Update Submit</button> :
                <button onClick={AddBtn}>Add Item</button>
            }
            <button onClick={() => setSubmitBtn(false)}>Close</button>
          </form>
        </div>

      }
      {
        state.showAdd &&
        <button className="btn-add" onClick={() => setState((preState) => ({ ...preState, showUpdate: true, showAdd: false }))}>Add Item</button>
      }
    </div>
  );
};

export default App;
