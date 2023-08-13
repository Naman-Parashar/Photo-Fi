function Button(props) {
  return (
    <>
      <button
        onClick={props.handelFunction}
        type="button"
        class={
          props.isAddAlbum
            ? "btn btn-outline-danger"
            : "btn btn-outline-primary"
        }
      >
        {props.btnName}
      </button>
    </>
  );
}

export default Button;
