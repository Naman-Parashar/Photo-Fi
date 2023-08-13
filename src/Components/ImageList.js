import { AiFillDelete } from "react-icons/ai";
import { BiEdit } from "react-icons/bi";
import { FaCopy } from "react-icons/fa";
import "./st.css";
function ImageList({ imgName, url, removeImg, handelCopy, handelEdit,showColage }) {
 
  return (
    <>
      <div class="card an" style={Styled.ani}>
        <img src={url} class="card-img-top" alt="..." onClick={showColage}/>
        <div class="card-body">
          <p class="card-text">
            <strong>{imgName}</strong>
          </p>
          <div class="container text-center">
            <div class="row row-cols-3">
              <div class="col">
                {" "}
                <AiFillDelete
                  size="2.2rem"
                  id="delLogo"
                  style={{ color: "red", cursor: "pointer" }}
                  onClick={() => removeImg(imgName, url)}
                />{" "}
              </div>
              <div class="col">
                {" "}
                <BiEdit
                  size="2.2rem"
                  style={{ cursor: "pointer" }}
                  onClick={() => handelEdit(imgName, url)}
                />
              </div>
              <div class="col">
                {" "}
                <FaCopy
                  size="2.2rem"
                  style={{ cursor: "pointer", color: "blue" }}
                  onClick={() => handelCopy(url)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const Styled={
  ani:{
    width: "18rem", 
  }
}
export default ImageList;
