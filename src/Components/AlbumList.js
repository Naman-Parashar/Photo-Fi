function AlbumList({
  title,
  timeStamp,
  intoFolder,
  FolderIndex,
  deleteFolder,
}) {
  return (
    <>
      <div class="card" style={Styled.main}>
        <div class="card-body" id="ccd" style={Styled.hov}>
          <h5 class="card-title">{title}</h5>
          <p class="card-text">Created On : {timeStamp}</p>
          <div class="btn btn-primary" onClick={() => intoFolder(FolderIndex)}>
            Into Folder
          </div>
          <div
            class="btn btn-danger ms-5"
            onClick={() => deleteFolder(FolderIndex)}
          >
            Delete
          </div>
        </div>
      </div>
    </>
  );
}
const Styled = {
  main: {
    width: "18rem",
  },
  hov: {
    boxShadow: "0px 5px 5px 0px rgba(0,0,0,0.75)",
  },
};
export default AlbumList;
