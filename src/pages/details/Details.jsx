import { useParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

import "./style.scss";
import DetailsBanner from "./detailsBanner/detailsBanner";
import Cast from "./cast/Cast";
import VideosSection from "./videoSection/VideoSection";
import Similar from "./caraousels/Similar";
import Recommendation from "./caraousels/Recommendation";



const Details = () => {
  const { mediaType, id } = useParams();
  const { data, loading } = useFetch(`/${mediaType}/${id}/videos`);
  const { data: credits, loading: loadingCredits } = useFetch(
    `/${mediaType}/${id}/credits`
  );


  return (
    <div>
      <DetailsBanner video={data?.results?.[0]} crew={credits?.crew} />
      <Cast data={credits?.cast} loading={loadingCredits}/>
      <VideosSection data={data} loading={loading} />
      <Similar mediaType={mediaType} id={id} />
      
      <Recommendation mediaType={mediaType} id={id}/>
    </div>
  );
};

export default Details;
