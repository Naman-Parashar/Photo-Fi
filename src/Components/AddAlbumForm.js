import Button from "./Button";
import { useRef, useEffect } from "react";
function AddAlbumForm({ handelClear, handelCreate }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);
  return (
    <div class="text-center bg-body-secondary" style={styled.main}>
      <div class="row ps-5">
        <div class="col-sm-11">
          <label for="inputEmail4" class="form-label mt-2">
            <strong> Enter Album Name </strong>
          </label>
          <input
            type="text"
            ref={inputRef}
            id="albumName"
            maxLength="20"
            class="form-control mt-3"
            placeholder="Album Name (20 Character Only)"
            aria-label="Album Name"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-sm-6">
          <Button
            btnName="Clear"
            isAddAlbum={true}
            handelFunction={() => handelClear(inputRef)}
          />
        </div>
        <div class="col-sm-6">
          <Button
            btnName="Create"
            isAddAlbum={false}
            handelFunction={() => handelCreate(inputRef)}
          />
        </div>
      </div>
    </div>
  );
}

const styled = {
  main: {
    width: "30%",
    height: "11rem",
    margin: "auto",
    marginTop: "1rem",
    boxShadow: "2px 3px 18px 3px rgba(176,207,193,1)",
    borderRadius: "30px",
  },
};
export default AddAlbumForm;
