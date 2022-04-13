import { useState, useEffect, useMemo } from "react";

const App = () => {

  // our states 
 const [state, setState] = useState({
    name: "",
    user: "",
    email: "",
    phone: "",
    item: []
  })





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
                <input type="search" id="name" placeholder="Search..." value={state.name} onChange={handleEvent} />
              </th>
              <th>User Name
                <br></br>
                <input type="search" id="user" placeholder="Search..." value={state.user} onChange={handleEvent} />
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
                    <td>{val.name}</td>
                    <td>{val.username}</td>
                    <td>{val.email}</td>
                    <td>{val.phone}</td>
                  </tr>
                )
              })
            }
            {
              FilterItem.length === 0 && state.item !== "" && "No matches..."
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
