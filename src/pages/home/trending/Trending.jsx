import { useState } from "react"
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper"
import SwitchTabs from "../../../components/switchTabs/SwitchTabs"
import useFetch from "../../../hooks/useFetch"
import Carousel from "../../../components/carousel/Carousel"


const Treanding = () => {

    const [endpoint, setEndpoint] =useState("day");
    const {data, loading} = useFetch(`/trending/all/${endpoint}`);

    const onTabChange = (tab) =>{
        setEndpoint(tab === "Day" ? "day" : "week")
    }
  return (
    <div className="caraouselSection">
        <ContentWrapper>
            <span className="caraouselTitle">Trending</span>
            <SwitchTabs data={["Day", "Week"]} onTabChange={onTabChange} />
        </ContentWrapper>
        <Carousel data={data?.results}
                loading={loading}
                endpoint={endpoint} />
    </div>
  )
}

export default Treanding