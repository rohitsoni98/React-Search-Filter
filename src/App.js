import { useState, useEffect, useMemo } from "react";

const App = () => {

  // our states 
  const [data, setData] = useState([]);
  const [filterName, setFilterName] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");





  // fetching api through axios
  useEffect(() => {
    const fetchData = () => {
      fetch('https://jsonplaceholder.typicode.com/users')
        .then(resp => resp.json())
        .then(itm => {
          setData(itm)
        })
    }
    fetchData();
  }, [])

  const fetchItem = useMemo(() => {
    return data.filter(item => {
      if (filterName === '' && filterUser === '' && filterEmail === '' && filterPhone === '') {
        return item
      }
      else if (item.name.toLowerCase().includes(filterName.toLocaleLowerCase()) &&
        item.username.toLowerCase().includes(filterUser.toLocaleLowerCase()) &&
        item.email.toLowerCase().includes(filterEmail.toLocaleLowerCase()) &&
        item.phone.includes(filterPhone)) {
        return item;
      }
    })
  }, [data, filterName, filterUser, filterEmail, filterPhone])


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
                <input type="search" placeholder="Search..." value={filterName} onChange={(e) => setFilterName(e.target.value)} />
              </th>
              <th>User Name
                <br></br>
                <input type="search" placeholder="Search..." value={filterUser} onChange={(e) => setFilterUser(e.target.value)} />
              </th>
              <th>Email
                <br></br>
                <input type="search" placeholder="Search..." value={filterEmail} onChange={(e) => setFilterEmail(e.target.value)} />
              </th>
              <th>Phone
                <br></br>
                <input type="search" placeholder="Search..." value={filterPhone} onChange={(e) => setFilterPhone(e.target.value)} />
              </th>
            </tr>
          </thead>
          <tbody>
            {
              fetchItem.map((val, index) => {
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
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
