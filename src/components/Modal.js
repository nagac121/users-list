import LoadingSpinner from "./LoadingSpinner";

function Modal(props) {
  function cancelHandler() {
    props.onCancel();
  }

  function confirmHandler() {
    props.onConfirm();
  }

  return (
    <div className="modal">
      <p className="comment-heading">Comments</p>
      {props.commentsLoading && <LoadingSpinner />}
      {!props.commentsLoading &&
        props.commentsData.map((comment) => (
          <div key={comment.id} className="comment">
            <div>{comment.name}</div>
            <div>{comment.email}</div>
            <div>{comment.body}</div>
          </div>
        ))}
      <button className="btn btn--alt" onClick={cancelHandler}>
        Cancel
      </button>
      <button className="btn" onClick={confirmHandler}>
        Confirm
      </button>
    </div>
  );
}

export default Modal;
