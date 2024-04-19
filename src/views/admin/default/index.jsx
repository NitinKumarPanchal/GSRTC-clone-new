import Select from "react-select";
import { CardSubtitle, Input } from "reactstrap";
import "../../../assets/css/ui.css";
import { FiSearch } from "react-icons/fi";
import { useState } from "react";
import Card from "components/card";
import City from "../../../Database/City.json";
import busData from "../../../Database/Seater-Bus.json";
import arrow from "../../../assets/img/logos/right-arrow.jpg";
import { isMobile } from "react-device-detect";
import NftCard from "components/card/NftCard";
import bg1 from "assets/img/bg/bg1.jpg";
import bg2 from "assets/img/bg/bg2.jpg";
import bg3 from "assets/img/bg/bg3.jpg";
import bg4 from "assets/img/bg/bg4.jpg";
import bg5 from "assets/img/bg/bg5.jpg";
import bg6 from "assets/img/bg/bg6.jpg";
import bg7 from "assets/img/bg/bg7.jpg"
import bg8 from "assets/img/bg/bg8.jpg";
import bg9 from "assets/img/bg/bg9.jpg";
import bg10 from "assets/img/bg/bg10.jpg";
import SeaterView from "components/Seats/Seater/SeaterView";
import Confirm from "components/Confirm-layout/Confirm";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Dashboard = () => {
  const [bookingDetails, setBookingDetails] = useState([]);
  const [boardingPoint, setBoardingPoint] = useState("Thara");
  const [dropingPoint, setDropingPoint] = useState("Ahmedabad");
  const [bookingDate, setbookingDate] = useState(new Date());
  const [showMessage, setShowMessage] = useState(false);
  const [busDetails, setBusDetails] = useState([]);
  const [showSeats, setShowSeats] = useState(false);
  const [showResults, setShowResults] = useState([]);

  const getTripCode = (e) => {
    const tripCode = e.serviceNumber.split("-");
    return tripCode[1];
  };

  const selectSeat = (data) => {
    setShowResults(data)
    setShowSeats(true);
  };

  const searchBus = () => {
    if (bookingDate === "") {
      alert("*please select booking date");
    } else {
      let busService = busData.filter((item) => {
        return (
          item.source === boardingPoint && item.destination === dropingPoint
        );
      });
      const data = busService[0]?.serviceDetailsList;
      setBusDetails(data);
      if (data?.length) {

        setShowMessage(false);
      } else {
        setShowMessage(true);
        setShowSeats(false);
      }
    }
  };
  return (
    <>  {bookingDetails[0]?.confirmation ? <Confirm data={bookingDetails} /> : <>
      {isMobile ? (
        <>
          <div className=" mobCard relative mt-[3px] items-center gap-2 bg-white px-3 py-3 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
            <div className="searchbusradius mb-3 h-full items-center bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white">
              <Select
                onChange={(e) => setBoardingPoint(e.value)}
                options={City}
                defaultValue={{ label: "Thara", value: "Thara" }}
              ></Select>
            </div>
            <div className=" searchbusradius mb-3 h-full items-center bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white ">
              <Select
                onChange={(e) => setDropingPoint(e.value)}
                options={City}
                defaultValue={{ label: "Ahmedabad", value: "Ahmedabad" }}
              ></Select>
            </div>
            <div className=" searchbusradius h-[40px] items-center bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white ">
              <div className="bookingDate">
                <DatePicker  selected={bookingDate} onChange={(e) => setbookingDate(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="searchbtn" onClick={() => searchBus()}>
              Search
            </button>
          </div>
          {(busDetails?.length && !showSeats) ? (
            <Card extra={"mt-3 !z-5 overflow-hidden"}>
              <div className="flex items-center justify-between rounded-t-3xl p-3 buslistheader">
                <div className="text-lg font-bold ">
                  <p style={{ fontSize: "smaller" }}> {boardingPoint}</p>
                </div>
                <div className="text-lg font-bold ">
                  <p>
                    {" "}
                    <img
                      className="h-10 w-10 rounded-full"
                      src={arrow}
                      style={{
                        width: "20px",
                        height: "20px",
                        marginLeft: "50px",
                      }}
                      alt=""
                    />
                  </p>
                  <p style={{ fontSize: "x-small", marginLeft: "30px" }}>
                    {bookingDate}
                  </p>
                </div>
                <div className="text-lg font-bold">
                  <p style={{ fontSize: "smaller" }}> {dropingPoint}</p>
                </div>
              </div>
              <CardSubtitle className="hr-line"></CardSubtitle>

              {busDetails.map((data, index) => (
                <Card extra={"mt-3 !z-5 overflow-hidden ml-2 mr-2"} >
                  <div
                    className="flex h-full w-full items-start justify-between bg-white px-3 py-[5px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
                    onClick={() => selectSeat(data, index)}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col">
                        <p
                          className=" text-black-600"
                          style={{ fontSize: "x-small" }}
                        >
                          <span>
                            {data.travelerAgentName + "-" + data.busType}
                          </span>
                        </p>
                        <h5
                          className="text-base font-bold text-navy-700 dark:text-white"
                          style={{ fontSize: "small" }}
                        >
                          {" "}
                          {data.startTime}
                        </h5>
                        <p
                          className=" text-black-600"
                          style={{ fontSize: "x-small" }}
                        >
                          {" "}
                          {"Tripcode:-"}
                          <span style={{ color: "blue" }}>
                            {getTripCode(data)}
                          </span>
                        </p>
                        <p
                          className="text-black-600 mt-1 text-sm font-normal"
                          style={{ fontSize: "x-small" }}
                        >
                          {" "}
                          {"Via:-" + data.via}{" "}
                        </p>
                      </div>
                      <div className="flex flex-col">
                        <h5
                          className="text-base font-bold text-navy-700 dark:text-white"
                          style={{ fontSize: "x-small", color: "red" }}
                        >
                          {"--- "}
                          {data.travelTime}
                          {" ---"}
                        </h5>
                        <p
                          className="mt-1 text-sm font-normal text-gray-600"
                          style={{ visibility: "hidden" }}
                        >
                          {" "}
                          {data.tripcode}{" "}
                        </p>
                        <p
                          className="mt-1 text-sm font-normal text-gray-600"
                          style={{ visibility: "hidden" }}
                        >
                          {" "}
                          {data.via}{" "}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-center text-navy-700 dark:text-white">
                      <div className="flex flex-col">
                        <h5
                          className="text-base font-bold text-navy-700 dark:text-white"
                          style={{ fontSize: "small" }}
                        >
                          {" "}
                          {data.arriveTime}
                        </h5>
                        <h5
                          className="mt-1 text-sm font-normal text-gray-700"
                          style={{ color: "green" }}
                        >
                          {" "}
                          {"10seats"}{" "}
                        </h5>
                        <p
                          className="mt-1 text-sm font-normal text-gray-600"
                          style={{ visibility: "hidden" }}
                        >
                          {" "}
                          {"10seats"}{" "}
                        </p>
                      </div>
                    </div>
                  </div>
                  <hr />
                </Card>
              ))}
            </Card>
          ) :
            showMessage ? <Card extra={"mt-3 !z-5 overflow-hidden"}>
              <div className="flex items-center justify-between rounded-t-3xl p-3">
                <div className="text-lg font-bold text-navy-700 dark:text-white">
                  <span style={{ fontSize: "smaller", color: "red", marginLeft: "23px" }}>
                    *There are no services on this route for the selected date. Select bus services available on alternative dates for this route.</span>
                </div>
              </div>
              <hr />
            </Card> : null
          }
        </>
      ) : (
        <>
          <div>
            <div className="searchbar">
              <div className="searchCard relative mt-[3px] flex h-[61px] w-[355px] flex-grow items-center justify-around gap-2 bg-white px-2 py-2 shadow-xl shadow-shadow-500 dark:!bg-navy-800 dark:shadow-none md:w-[365px] md:flex-grow-0 md:gap-1 xl:w-[365px] xl:gap-2">
                <div className="searchCard flex h-full items-center bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
                  <p className="pl-3 pr-2 text-xl">
                    <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
                  </p>
                  <Select
                    onChange={(e) => setBoardingPoint(e.value)}
                    options={City}
                    defaultValue={{ label: "Thara", value: "Thara" }}
                  ></Select>
                </div>
                <div className="searchCard flex h-full items-center bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
                  <p className="pl-3 pr-2 text-xl">
                    <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
                  </p>
                  <Select
                    onChange={(e) => setDropingPoint(e.value)}
                    options={City}
                    defaultValue={{ label: "Ahmedabad", value: "Ahmedabad" }}
                  ></Select>
                </div>
                <div className="searchCard flex h-full items-center bg-lightPrimary text-navy-700 dark:bg-navy-900 dark:text-white xl:w-[225px]">
                  <p className="pl-3 pr-2 text-xl">
                    <FiSearch className="h-4 w-4 text-gray-400 dark:text-white" />
                  </p>
                  <DatePicker selected={bookingDate} onChange={(e) => setbookingDate(e.target.value)} />
                </div>
                <button className="searchbtn" onClick={() => searchBus()}>
                  Search
                </button>
              </div>
            </div>

            {(busDetails?.length && !showSeats) ? (
              <div className="mt-5 xl:ml-[313px] xl:mr-[313px]">
                <Card extra={"mt-3 !z-5 overflow-hidden"}>
                  <div className="flex items-center justify-between rounded-t-3xl p-3 buslistheader">
                    <div className="text-lg font-bold">
                      {boardingPoint}
                    </div>
                    <div className="text-lg font-bold">
                      to
                    </div>
                    <div className="text-lg font-bold">
                      {dropingPoint}
                    </div>
                  </div>
                  <hr />

                  <div className="busLists mostly-customized-scrollbar">
                    {busDetails.map((data, index) => (
                      <Card extra={"mt-3 !z-5 overflow-hidden ml-5 mr-5"} >
                        <div
                          className="flex h-full w-full items-start justify-between bg-white px-3 py-[5px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700"
                          onClick={() => selectSeat(data, index)}
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex flex-col">
                              <p className=" text-black-600 boardingWebFonts">
                                <span>
                                  {data.travelerAgentName + "-" + data.busType}
                                </span>
                              </p>
                              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                {" "}
                                {data.startTime}
                              </h5>
                              <p className=" text-black-600 boardingWebFonts">
                                {" "}
                                {"Tripcode - "}
                                <span style={{ color: "blue" }}>
                                  {getTripCode(data)}
                                </span>
                              </p>
                              <p className="text-black-600 boardingWebFonts mt-1 text-sm font-normal">
                                {" "}
                                {"Via - " + data.via}{" "}
                              </p>
                            </div>
                            <div className="flex flex-col">
                              <h5 className="hours text-base font-bold text-navy-700 dark:text-white">
                                {"--- "}
                                {data.travelTime}
                                {" ---"}
                              </h5>
                              <p
                                className="mt-1 text-sm font-bold font-normal text-gray-600"
                                style={{ visibility: "hidden" }}
                              >
                                {" "}
                                {data.tripcode}{" "}
                              </p>
                              <p
                                className="mt-1 text-sm font-normal text-gray-600"
                                style={{ visibility: "hidden" }}
                              >
                                {" "}
                                {data.via}{" "}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center justify-center text-navy-700 dark:text-white">
                            <div className="mt-4 flex flex-col">
                              <h5 className="text-base font-bold text-navy-700 dark:text-white">
                                {data.arriveTime}
                              </h5>
                              <span className="">
                                <button
                                  className="bookbtn"
                                  onClick={() => selectSeat(data, index)}
                                >
                                  10 seats
                                </button>
                              </span>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Card>
                    ))}
                  </div>

                </Card>
              </div>
            ) :
              showMessage ? <Card extra={"mt-3 !z-5 overflow-hidden"}>
                <div className="flex items-center justify-between rounded-t-3xl p-3">
                  <div className="text-lg font-bold text-navy-700 dark:text-white">
                    <span style={{ fontSize: "smaller", color: "red", marginLeft: "23px" }}>
                      *There are no services on this route for the selected date. Select bus services available on alternative dates for this route.</span>
                  </div>
                </div>
                <hr />
              </Card> : null}
          </div>
        </>
      )}
      {showSeats ? <SeaterView busRow={showResults} bookingData={setBookingDetails} /> : null}
      <div className="xl mt-3 grid h-full grid-cols-1 gap-5">
        <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
          <div className="mb-5 mt-5 flex items-center justify-between px-[26px]">
            <h4 className="text-2xl font-bold text-navy-700 dark:text-white">
              Top Destinations
            </h4>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
            <NftCard
              bidders={[bg1, bg2]}
              title="Dwarka, Gujarat"
              author="Nitin Panchal"
              price="0.91"
              image={bg1}
            />
            <NftCard
              bidders={[bg2, bg3]}
              title="Gir National Park"
              author="Nitin Panchal"
              price="0.7"
              image={bg2}
            />
            <NftCard
              bidders={[bg3, bg4]}
              title="Statue Of Unity"
              author="Nitin Panchal"
              price="2.91"
              image={bg3}
            />
            <NftCard
              bidders={[bg4, bg5]}
              title="Kutch"
              author="Nitin Panchal"
              price="2.91"
              image={bg4}
            />
            <NftCard
              bidders={[bg5, bg6]}
              title="Junagadh (Girnar)"
              author="Nitin Panchal"
              price="2.91"
              image={bg5}
            />

            <NftCard
              bidders={[bg6, bg7]}
              title="Somanath"
              author="Nitin Panchal"
              price="0.91"
              image={bg6}
            />
            <NftCard
              bidders={[bg7, bg8]}
              title="Nageshwar Jyotirlinga"
              author="Nitin Panchal"
              price="0.7"
              image={bg7}
            />
            <NftCard
              bidders={[bg8, bg9]}
              title="Rani ki Vav, Patan"
              author="Nitin Panchal"
              price="2.91"
              image={bg8}
            />
            <NftCard
              bidders={[bg9, bg10]}
              title="Shivarajpur Beach"
              author="Nitin Panchal"
              price="2.91"
              image={bg9}
            />
            <NftCard
              bidders={[bg10, bg9]}
              title="Sarangpur Hanuman Mandir"
              author="Nitin Panchal"
              price="2.91"
              image={bg10}
            />
          </div>
        </div>
      </div></>}

    </>
  );
};

export default Dashboard;
