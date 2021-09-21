import User from "./User";

function UsersList(props) {
  return (
    <span>
      {props.users.map(user => (
        <User user={user} key={user.id}/>
      ))}
    </span>
  )

}
export default UsersList;