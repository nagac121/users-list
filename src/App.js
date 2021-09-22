import { useState, useEffect, useCallback } from "react";
import UsersList from "./components/UsersList";
import PostsList from "./components/PostsList";

import "./App.css";

function App() {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [activeUser, setActiveUser] = useState(null);
  const [isDataLoading, setIsDataLoading] = useState(false);

  const fetchUsers = useCallback(async () => {
    setIsDataLoading(true);
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
      setIsDataLoading(false);
      setUsers(usersList);
    } catch (error) {
      // setError(error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const onUserClick = useCallback(async (id) => {
    setActiveUser(id);
    setIsDataLoading(true);
    const fetchedPosts = await fetch(
      "https://jsonplaceholder.typicode.com/posts"
    );
    const postsRes = await fetchedPosts.json();
    let postsList = [];
    const userPosts = postsRes.filter((post) => id === post.userId);
    for (let post of userPosts) {
      postsList.push({
        title: post.title,
        body: post.body,
      });
    }
    console.log("userPosts: ", userPosts);
    setIsDataLoading(false);
    setPosts(userPosts);
  }, []);

  return (
    <div className="App">
      {/* display users list */}
      {isDataLoading && (
        <div className={"spinner"}>Please wait, data is loading ... </div>
      )}
      {!isDataLoading && (
        <UsersList
          users={users}
          userClickMethod={onUserClick}
          activeUser={activeUser}
        />
      )}
      {/* display user detail */}
      {isDataLoading && (
        <div className={"spinner"}>Please wait, data is loading ... </div>
      )}
      {!isDataLoading && <PostsList postsList={posts} />}
    </div>
  );
}

export default App;
