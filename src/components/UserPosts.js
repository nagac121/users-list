import styles from "./UserPosts.module.css";

function UserPosts(props) {
  return (
    <div className={styles.posts}>
      {props.UserPosts.map((post) => (
        <div key={post.id} className={styles.postButton}>
          <div className={styles.post}>
            <p>{post.title}</p>
            <p>{post.body}</p>
          </div>
          <button className={styles.btnExpand}>Expand</button>
        </div>
      ))}
    </div>
  );
}
export default UserPosts;
