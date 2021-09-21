import { useState, useEffect, useCallback } from "react";
import UsersList from "./components/UsersList";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  const fetchUsers = useCallback(async () => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      console.log("data: ", data);
      let usersList = [];
      for (const user of data) {
        // console.log("user: ",user)
        usersList.push({
          id: user.id,
          name: user.name,
        });
      }
      setUsers(usersList);
      // console.log("users: ", users);
    } catch (error) {
      // setError(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onUserClick = (id) => {
    console.log("id: ", id);
  };

  return (
    <div className="App">
      <UsersList users={users} userClickMethod={onUserClick} />
      {/* display user detail */}
    </div>
  );
}

export default App;
