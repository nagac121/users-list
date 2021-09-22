import { useState, useEffect, useCallback } from "react";
import UsersList from "./components/UsersList";
import UserPosts from "./components/UserPosts";
import Modal from "./components/Modal";
import Backdrop from "./components/Backdrop";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [areUserPostsLoading, setAreUserPostsLoading] = useState(false);
  const [areUsersLoading, setAreUsersLoading] = useState(false);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const fetchUsers = useCallback(async () => {
    setAreUsersLoading(true);
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();
      let usersList = [];
      for (const user of data) {
        usersList.push({
          id: user.id,
          name: user.name,
        });
      }
      setAreUsersLoading(false);
      setUsers(usersList);
    } catch (error) {
      // setError(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onUserClick = useCallback(
    async (id) => {
      console.log("id: ", id);
      if (id) {
        setActiveUser(id);
        setAreUserPostsLoading(true);
        const fetchedPosts = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsRes = await fetchedPosts.json();
        setFilteredPosts(postsRes.filter((post) => id === post.userId));
        console.log("filteredPosts: ", filteredPosts);
        let userPosts = [];
        if (filteredPosts.length < 3) {
          userPosts = filteredPosts;
        } else {
          userPosts = [];
          for (let i = 0; i < 3; i++) {
            userPosts.push(filteredPosts[i]);
          }
        }
        setAreUserPostsLoading(false);
        setUserPosts(userPosts);
      } else {
        setUserPosts(filteredPosts);
      }
    },
    [filteredPosts]
  );
  function closeModalHandler() {
    setModalIsOpen(false);
  }
  const onClickExpand = () => {
    setModalIsOpen(true);
  };

  return (
    <div className="App">
      {areUsersLoading && (
        <div className={"spinner"}>Please wait, "users" are loading...</div>
      )}
      {!areUsersLoading && (
        <UsersList
          users={users}
          userClickMethod={onUserClick}
          activeUser={activeUser}
        />
      )}
      {areUserPostsLoading && (
        <div className={"spinner"}>
          Please wait, "user posts" are loading...{" "}
        </div>
      )}
      {!areUserPostsLoading && (
        <UserPosts
          userPosts={userPosts}
          userClickMethod={onUserClick}
          expandClickMethod={onClickExpand}
        />
      )}
      {modalIsOpen && (
        <Modal onCancel={closeModalHandler} onConfirm={closeModalHandler} />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </div>
  );
}

export default App;
