import AlbumList from "./AlbumList";

function Albums({ albums, intoFolder, deleteFolder }) {
  return (
    <>
      <h3 class="mt-3">YOUR ALBUMS</h3>
      <div class="container text-center">
        <div class="row row-cols-4 mt-5">
          {albums.map((obj, index) => (
            <div class="col mb-5">
              {" "}
              <AlbumList
                key={index + 1}
                FolderIndex={index}
                deleteFolder={deleteFolder}
                intoFolder={intoFolder}
                title={obj.id}
                timeStamp={obj.timeStamp}
              />{" "}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default Albums;
