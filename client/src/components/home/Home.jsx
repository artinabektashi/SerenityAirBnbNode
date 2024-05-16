import MainHeader from "../layout/MainHeader";
import Parallax from "../common/Parallax";
import HotelService from "../common/HotelService";
import RoomCarousel from "../common/RoomCarousel";
import RoomSearch from "../common/RoomSearch";
import AboutUs from "../service/AboutUs";

const Home = () => {
  return (
    <section>
      <MainHeader />
      <div className="container">
        <RoomSearch />
        <RoomCarousel />
        <Parallax />
        <AboutUs />
        <HotelService />
      </div>
    </section>
  );
};

export default Home;
