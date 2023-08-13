import { AiOutlineClose } from "react-icons/ai";
function ImgColage({showColage,imgData}) {
    return ( 
    <>
    <div style={{marginLeft:"20px",cursor:"pointer",width:"2rem",color:"red"}} onClick={showColage}>
      <AiOutlineClose size="2rem"/>
    </div>

<div id="carouselExample" class="carousel slide  m-auto mb-5" style={{width:"48rem"}} >
  <div class="carousel-inner">
    {
      imgData.map((data)=>(
        <div class="carousel-item active">
        <img src={data.url} class="d-block w-100" alt="..."/>
      </div>
      ))
    }
   
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
        </> );
}

export default ImgColage;