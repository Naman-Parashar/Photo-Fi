import NavBar from "./NavBar";
import ImgColage from "./ImgColage";
import AddImageForm from "./AddImageForm";
import { db } from "../firebaseConfig";
import { useState, useEffect } from "react";
import { SlActionUndo } from "react-icons/sl";
import { FcBinoculars } from "react-icons/fc";
import { FcCancel } from "react-icons/fc";
import {
  doc,
  updateDoc,
  arrayUnion,
  onSnapshot,
  arrayRemove,
} from "firebase/firestore";
import ImageList from "./ImageList";
import Spinner from "react-spinner-material";

function InAlbum({
  isAddData,
  handelAddData,
  albums,
  index,
  notify,
  handelBack,
  notifyCopied,
  setEdit,
  isEdit,
  url,
  name,
  setUrl,
  setName,
  setAddData,
}) {
  const [showSearch, setSearch] = useState(false);
  const [imgData, setImgData] = useState([]);
  const [isSpinner, setSpinner] = useState(true);
  const [isImgColage, setColage] = useState(false);

  useEffect(() => {
    let id = albums[index].id;
    async function getData() {
      await onSnapshot(doc(db, "albums", id), (doc) => {
        const data = doc.data().imgUrl;
        const v = data.map((n) => {
          return {
            name: n.name,
            url: n.url,
          };
        });
        setImgData(v, ...imgData);
      });
    }
    setInterval(() => {
      getData();
      setSpinner(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function showColage(){
    setColage(!isImgColage);
  }

  function search(searchRef) {
    setSearch(!showSearch);
  }
  async function handelCreateImg(imgInputRef, imgUrlRef) {
    if (imgInputRef.current.value === "" || imgUrlRef.current.value === "") {
      alert("Field Can't be empty");
      imgInputRef.current.focus();
      return;
    }
    let id = albums[index].id;
    const washingtonRef = doc(db, "albums", id);
    await updateDoc(washingtonRef, {
      imgUrl: arrayUnion({
        name: imgInputRef.current.value,
        url: imgUrlRef.current.value,
      }),
    });
    handelAddData();
    notify(true);
  }

  async function removeImg(imgName, url) {
    let id = albums[index].id;
    const washingtonRef = doc(db, "albums", id);
    await updateDoc(washingtonRef, {
      imgUrl: arrayRemove({ name: imgName, url: url }),
    });
    notify(false);
  }

  function handelClearImg(imgInputRef) {
    document.getElementById("imgName").value = "";
    document.getElementById("imgUrl").value = "";
    imgInputRef.current.focus();
  }

  function handelCopy(url) {
    var tempTextArea = document.createElement("textarea");
    tempTextArea.value = url;

    // Append the textarea element to the DOM
    document.body.appendChild(tempTextArea);

    // Select the text in the textarea
    tempTextArea.select();

    // Copy the selected text to the clipboard
    document.execCommand("copy");

    // Remove the temporary textarea from the DOM
    document.body.removeChild(tempTextArea);
    notifyCopied();
  }

  function handelEdit(imgName, url) {
    setEdit(true);
    setName(imgName);
    setUrl(url);
    setAddData(!isAddData);
  }

  function handeEditBtn(imgInputRef, imgUrlRef) {
    // todo add edit function
    alert("Edit to be added");
    setEdit(false);
    handelAddData();
  }

  return (
    <>
      <NavBar
        btnName="Add Image"
        isAddData={isAddData}
        handelAddData={handelAddData}
      />
      <div style={Styled.main}>
        <div onClick={handelBack} style={Styled.back}>
          <SlActionUndo size="3rem" />
        </div>
        <h1>Your Image's {albums[index].id}</h1>
        <div>
          {showSearch ? (
            <input
              style={Styled.search}
              type="text"
              id="searchbar"
              placeholder=" Search....."
            />
          ) : null}
          {showSearch ? (
            <FcCancel size="3rem" onClick={search} />
          ) : (
            <FcBinoculars
              size="3rem"
              onClick={search}
              style={Styled.searchIcon}
            />
          )}
        </div>
      </div>
      {isAddData ? (
        <AddImageForm
          name={name}
          url={url}
          handeEditBtn={handeEditBtn}
          isEdit={isEdit}
          handelClearImg={handelClearImg}
          handelCreateImg={handelCreateImg}
          index={index}
          albums={albums}
        />
      ) : null}
      <hr />
      <Spinner
        radius={120}
        color={"#4A9FB8"}
        stroke={10}
        visible={isSpinner}
        style={Styled.spinner}
      />

    

      {imgData.length === 0 && !isSpinner ? (
        <h1 style={Styled.h}>No Image Found</h1>
      ) : (
        isImgColage ?  <ImgColage imgData={imgData} showColage={showColage}/>  :
        <div class="container text-center">
          <div class="row row-cols-4 mt-5">
            {imgData.map((data, index) => (
              <div class="col mb-5">
                {" "}
                <ImageList
                showColage={showColage}
                  key={index}
                  handelEdit={handelEdit}
                  handelCopy={handelCopy}
                  removeImg={removeImg}
                  imgName={data.name}
                  url={data.url}
                />{" "}
              </div>
            ))}
          </div>
        </div>
        )
      }
    </>
  );
}

const Styled = {
  main: {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "2rem",
  },
  search: {
    marginRight: "10px",
    borderRadius: "3px",
  },
  searchIcon: {
    cursor: "pointer",
  },
  h: {
    marginLeft: "40%",
    marginTop: "10%",
  },
  spinner: {
    margin: "auto",
    marginTop: "16%",
  },
  back: {
    cursor: "pointer",
  },
};
export default InAlbum;
