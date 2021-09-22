import { useState, useEffect, useCallback } from "react";
import UserList from "./components/UserList";
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
  const [comments, setComments] = useState([]);

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
    async (userId) => {
      console.log("userId: ", userId);
      if (userId) {
        let userPosts = [];
        setActiveUser(userId);
        setAreUserPostsLoading(true);
        const fetchedPosts = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const postsRes = await fetchedPosts.json();
        const filteredArr = postsRes.filter((post) => userId === post.userId);
        setFilteredPosts(filteredArr);
        console.log("filteredPosts: ", filteredPosts);
        if (filteredArr.length < 3) {
          userPosts = filteredArr;
        } else {
          userPosts = [];
          for (let i = 0; i < 3; i++) {
            userPosts.push(filteredArr[i]);
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
  const onClickExpand = useCallback(async (postId) => {
    console.log("postId: ", postId);
    setModalIsOpen(true);
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
    );
    const commentsJson = await res.json();
    console.log("commentsJson: ", commentsJson);
    setComments(commentsJson);
  }, []);

  return (
    <div className="App">
      {areUsersLoading && (
        <div className={"spinner"}>Please wait, "users" are loading...</div>
      )}
      {!areUsersLoading && (
        <UserList
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
        <Modal
          onCancel={closeModalHandler}
          onConfirm={closeModalHandler}
          commentsData={comments}
        />
      )}
      {modalIsOpen && <Backdrop onCancel={closeModalHandler} />}
    </div>
  );
}

export default App;
