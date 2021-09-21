import styles from "./User.module.css";

function User(props) {
  return <span className={styles.User}>{props.user.name}</span>;
}
export default User;
