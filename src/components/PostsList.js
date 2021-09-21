import styles from "./PostsList.module.css";

function PostsList(props) {
  return (
    <div className={styles.posts}>
      {props.postsList.map((post) => (
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
export default PostsList;
