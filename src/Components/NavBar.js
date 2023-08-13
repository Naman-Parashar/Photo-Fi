import { FcCompactCamera } from "react-icons/fc";
import Button from "./Button";
function NavBar({ isAddData, handelAddData, btnName }) {
  return (
    <>
      <nav class="navbar navbar-expand-lg bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand text-light" href="/">
            <FcCompactCamera size="2rem" />
            PhotoFi
          </a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <Button
            btnName={isAddData ? "Cancel" : btnName}
            isAddAlbum={isAddData}
            handelFunction={handelAddData}
          />
        </div>
      </nav>
    </>
  );
}

export default NavBar;
