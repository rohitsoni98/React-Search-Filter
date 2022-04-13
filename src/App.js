import { useState, useEffect, useMemo, useCallback } from "react";

const App = () => {

  // our states 
  const [state, setState] = useState({
    name: "",
    user: "",
    email: "",
    phone: "",
    item: []
  })

  // debouncing function
  const debounce = (func) => {
    let timer;
    return function (...args) {
      const context = this;
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        timer = null;
        func.apply(context, args);
      }, 2000);
    };
  };


  // fetching api through axios
  useEffect(() => {
    const fetchData = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(itm => {
          setState(prevState => ({ ...prevState, item: itm }))
        })
    }
    fetchData();
  }, [])

  const FilterItem = useMemo(() => {
    return state.item.filter(item => {
      if (state.name === "" && state.user === "" && state.email === "" && state.phone === "") {
        return item
      } else if (item.name.toLowerCase().includes(state.name.toLocaleLowerCase()) &&
        item.username.toLowerCase().includes(state.user.toLocaleLowerCase()) &&
        item.email.toLowerCase().includes(state.email.toLocaleLowerCase()) &&
        item.phone.includes(state.phone)) {
        return item;
      }
    })
  }, [state, state.name, state.user, state.email, state.phone])


  const handleEvent = (e) => {
    const value = e.target.value;
    const id = e.target.id
    setState((preState) => ({ ...preState, [id]: value }))
  }

  const optimizedFn = useCallback(debounce(handleEvent), []);

  const handleCLick = (e) => {

    console.log({
      name: state.item
    })

  }


  // returning jsx  
  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}>
      <h1>Search Filter Application in React</h1>
      <div className="table">
        <table>
          <thead>
            <tr className="tableHeading">
              <th>Name
                <br></br>
                <input type="search" id="name" placeholder="Search..." onChange={optimizedFn} />
              </th>
              <th>User Name
                <br></br>
                <input type="search" id="user" placeholder="Search..." onChange={optimizedFn} />
              </th>
              <th>Email
                <br></br>
                <input type="search" id="email" placeholder="Search..." value={state.email} onChange={handleEvent} />
              </th>
              <th>Phone
                <br></br>
                <input type="search" id="phone" placeholder="Search..." value={state.phone} onChange={handleEvent} />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              FilterItem.map((val, index) => {
                return (
                  <tr className="tableItem" key={index} style={{ textAlign: "center" }}>
                    <td onClick={handleCLick}>
                      {val.name}
                    </td>
                    <td onClick={handleCLick}>
                      {val.username}
                    </td>
                    <td onClick={handleCLick}>
                      {val.email}
                    </td>
                    <td onClick={handleCLick}>
                      {val.phone}
                    </td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
