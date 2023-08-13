import Button from "./Button";
import { useRef, useEffect } from "react";
function AddImageForm({
  handelClearImg,
  handelCreateImg,
  albums,
  index,
  isEdit,
  handeEditBtn,
  name,
  url,
}) {
  const imgInputRef = useRef(null);
  const imgUrlRef = useRef(null);

  useEffect(() => {
    imgInputRef.current.focus();
  }, []);

  console.log();
  return (
    <div class="text-center bg-body-secondary" style={styled.main}>
      <div class="row ps-5">
        <div class="col-sm-11">
          <label for="inputEmail4" class="form-label mt-2">
            <strong>
              {isEdit ? "Edit Image" : "Add Image to " + albums[index].id}{" "}
            </strong>
          </label>
          <input
            type="text"
            ref={imgInputRef}
            id="imgName"
            maxLength="20"
            defaultValue={name}
            class="form-control mt-3"
            placeholder="Image Title (20 Character Only)"
            aria-label="Album Name"
          />
        </div>

        <div class="col-sm-11">
          <input
            type="text"
            ref={imgUrlRef}
            id="imgUrl"
            class="form-control mt-3"
            defaultValue={url}
            placeholder="http://www.example.com/index.html"
            aria-label="Album Name"
          />
        </div>
      </div>
      <div class="row mt-4">
        <div class="col-sm-6">
          <Button
            btnName="Clear"
            isAddAlbum={true}
            handelFunction={() => handelClearImg(imgInputRef)}
          />
        </div>
        <div class="col-sm-6">
          <Button
            btnName={isEdit ? "Edit" : "Create"}
            isAddAlbum={false}
            handelFunction={() =>
              isEdit
                ? handeEditBtn(imgInputRef, imgUrlRef)
                : handelCreateImg(imgInputRef, imgUrlRef)
            }
          />
        </div>
      </div>
    </div>
  );
}

const styled = {
  main: {
    width: "50%",
    height: "17rem",
    margin: "auto",
    marginTop: "1rem",
    boxShadow: "2px 3px 18px 3px rgba(176,207,193,1)",
    borderRadius: "30px",
  },
};

export default AddImageForm;
