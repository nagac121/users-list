import styles from "./UserPosts.module.css";

function UserPosts(props) {
  return (
    <div className={styles.userPosts}>
      {props.userPosts.map((post) => (
        <div key={post.id} className={styles.userPost}>
          <div className={styles.post}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </div>
          <button
            className="btn"
            onClick={props.expandClickMethod.bind(null, post.id)}
          >
            Expand
          </button>
        </div>
      ))}
      {
        <button
          className={styles.btnUser}
          style={{ display: props.enableLoadBtnFlag ? "block" : "none" }}
          onClick={props.userClickMethod.bind(null, null)}
        >
          Load All
        </button>
      }
    </div>
  );
}
export default UserPosts;
