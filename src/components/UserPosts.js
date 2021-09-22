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
          <button className={styles.btnExpand}>Expand</button>
        </div>
      ))}
      <button className={styles.btnUser} onClick={props.userClickMethod.bind(null,null)}>... Load All</button>
    </div>
  );
}
export default UserPosts;
