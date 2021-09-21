import styles from "./UserList.module.css";

function UsersList(props) {
  return (
    <div>
      {props.users.map((user) => (
        <span
          key={user.id}
          className={styles.user}
          onClick={props.userClickMethod.bind(null, user.id)}
        >
          {user.name}
        </span>
      ))}
    </div>
  );
}
export default UsersList;
