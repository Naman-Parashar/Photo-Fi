import { useState, useEffect, useReducer } from "react";
import {
  doc,
  getDoc,
  setDoc,
  onSnapshot,
  collection,
  deleteDoc,
} from "firebase/firestore";
// lib for tostify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// spinner
import Spinner from "react-spinner-material";

// Importing Components
import AddAlbumForm from "./Components/AddAlbumForm";
import Albums from "./Components/Albums";
import NavBar from "./Components/NavBar";
import { db } from "./firebaseConfig";
import InAlbum from "./Components/InAlbum";

// Reducer function To add albums.
function albumsReducer(state, action) {
  switch (action.type) {
    case "ADD":
      return action.data;
    default:
      return [];
  }
}

function App() {
  const [albums, dispatch] = useReducer(albumsReducer, []);
  const [isAddData, setAddData] = useState(false);
  const [isSpinner, setSpinner] = useState(true);
  const [ishomePage, setHomePage] = useState(true);
  const [fIndex, setIndex] = useState(-1);
  const [isEdit, setEdit] = useState(false);
  const [name, setName] = useState();
  const [url, setUrl] = useState();

  useEffect(() => {
    async function getData() {
      await onSnapshot(collection(db, "albums"), (snapShot) => {
        const data = snapShot.docs.map((doc) => {
          return {
            ...doc.data(),
          };
        });
        dispatch({ type: "ADD", data: data });
      });
    }
    setInterval(() => {
      getData();
      setSpinner(false);
    }, 1000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const notifyAlbumCreated = () =>
    toast("🦄   Album Added Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyAlbumExists = () =>
    toast.error("Album Already Exists", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyImageAdded = () =>
    toast("🎴 Image Added Successfully", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyImageRemoved = () =>
    toast.error("Image Removed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const notifyFolderRemoved = () =>
    toast.error("Folder Removed", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const notifyCopied = () =>
    toast.success("URL COPIED", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

  function handelBack() {
    setHomePage(!ishomePage);
    setAddData(false);
  }

  function notify(a) {
    if (a) {
      notifyImageAdded();
    } else {
      notifyImageRemoved();
    }
  }
  function handelClear(inputRef) {
    document.getElementById("albumName").value = "";
    inputRef.current.focus();
  }
  async function handelCreate(inputRef) {
    let id = inputRef.current.value;
    const docRef = doc(db, "albums", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      notifyAlbumExists();
      inputRef.current.focus();
    } else {
      await setDoc(doc(db, "albums", id), {
        id: id,
        imgUrl: [],
        timeStamp: new Date().toLocaleString(),
      });
      notifyAlbumCreated();
      setAddData(!isAddData);
    }
  }
  function handelAddData() {
    setAddData(!isAddData);
    setEdit(false);
    setUrl("");
    setName("");
  }
  function intoFolder(index) {
    setIndex(index);
    setAddData(false);
    setHomePage(!ishomePage);
  }

  async function deleteFolder(folderIndex) {
    let id = albums[folderIndex].id;
    await deleteDoc(doc(db, "albums", id));
    notifyFolderRemoved();
  }
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
      />
      {ishomePage ? (
        <div>
          <NavBar
            isAddData={isAddData}
            handelAddData={handelAddData}
            btnName="Add Album"
          />
          {isAddData ? (
            <AddAlbumForm
              handelClear={handelClear}
              handelCreate={handelCreate}
            />
          ) : null}
          <Spinner
            radius={120}
            color={"#4A9FB8"}
            stroke={10}
            visible={isSpinner}
            style={Styled.spinner}
          />
          {isSpinner ? null : (
            <Albums
              deleteFolder={deleteFolder}
              intoFolder={intoFolder}
              albums={albums}
            />
          )}{" "}
        </div>
      ) : (
        <InAlbum
          setAddData={setAddData}
          setUrl={setUrl}
          setName={setName}
          name={name}
          url={url}
          setEdit={setEdit}
          isEdit={isEdit}
          notifyCopied={notifyCopied}
          isAddData={isAddData}
          handelAddData={handelAddData}
          albums={albums}
          index={fIndex}
          notify={notify}
          handelBack={handelBack}
        />
      )}
    </>
  );
}

const Styled = {
  spinner: {
    margin: "auto",
    marginTop: "16%",
  },
};
export default App;
