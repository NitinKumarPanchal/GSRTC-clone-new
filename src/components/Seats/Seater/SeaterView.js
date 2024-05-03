import { useEffect, useState } from "react";
import AvailableSeats from "../../../assets/img/seats/AvailableSeats-V.png";
import SelectedSeats from "../../../assets/img/seats/SelectedSeats-V.png";
import BookedSeats from "../../../assets/img/seats/BookedSeats-V.png";
import { isMobile } from "react-device-detect";
import availISeatIcon from "../../../assets/img/seats/availISeatIcon.png";
import filledSeatIcon from "../../../assets/img/seats/filledSeatIcon.png";
import selectedSeatIcon from "../../../assets/img/seats/selectedSeatIcon.png";
import "../../../assets/css/seat.css";
import {
  Card,
  Row,
  Col,
  CardTitle,
  CardBody,
  CardSubtitle,
} from "reactstrap";


const SeaterView = (props) => {
  let SeaterDb = [];
  const [data] = useState([props.busRow]);
  const [showSeatName, setshowSeatName] = useState("");
  const [availableSeats, setAvailableSeats] = useState(10);
  const [queue, setQueue] = useState(false);
  const [confirmBtn, setConfirmBtn] = useState(false);
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [gender] = useState("");
  const [baseFare, setBaseFare] = useState(0);
  const [selectedValue, setSelectedValue] = useState("male");

  let bookedSeatsNo = [];
  let reservationDetails = {
    name: name,
    email: email,
    mobile: mobile,
    gender: gender,
    seats: "",
  };

  const handleRadioChange = (value) => {
    setSelectedValue(value);
  };

  const checkConfirmation = (flag) => {
    if (flag) {
      if (name !== "" && email !== "" && mobile !== "") {
        setConfirmBtn(true);
      } else if (name === "" || email === "" || mobile === "") {
        setConfirmBtn(false);
      }
    }
    else {
      setConfirmBtn(false);
    }

  };

  const bookTicket = (ele) => {
    reservationDetails.seats = showSeatName;
    const tripCode = ele.serviceNumber.split("-");
    const PNR =
      "G" +
      Math.floor(Math.random() * 28758778) +
      "," +
      "G" +
      Math.floor(Math.random() * 28758778);
    const ticketDetails = [
      {
        boardingInfoList: ele.boardingInfoList[0],
        droppingInfoList: ele.droppingInfoList[0],
        reservationDetails: reservationDetails,
        tripCode: tripCode[1],
        PNR: PNR,
        confirmation: true,
      },
    ];
    props.bookingData(ticketDetails);
  };

  useEffect(() => {
    getSeatDetails();
    generateTable();
    getSeatAvailability();
  }, []);

  const getSeatDetails = () => {
    SeaterDb = props.busRow.reservedSeat;
  };

  const getSeatAvailability = () => {
    let data = [];
    // eslint-disable-next-line array-callback-return
    SeaterDb.map((item, i) => {
      const empty = item.seats.filter((i) => i.status === "empty");
      data.push(empty);
    });
    setAvailableSeats(Object.values(data).flat().length);
  };

  function generateTable() {
    const tbl = document.createElement("table");
    const tblBody = document.createElement("tbody");
    // eslint-disable-next-line array-callback-return
    SeaterDb.map((item, i) => {
      const row = document.createElement("tr");

      // eslint-disable-next-line array-callback-return
      item.seats.map((item, j) => {
        if (j !== 2 && j !== 1 && j !== 0) {
          const cell = document.createElement("td");
          var span = document.createElement("span");
          span.className = "seaterMobseatNo";
          span.innerText = item.seatNo;
          cell.appendChild(span);
          var img = document.createElement("img");
          img.className = isMobile ? "seaterMobView" : "seaterWebView";
          img.src = getSeatStatus(item);
          cell.appendChild(img);
          row.appendChild(cell);
          cell.addEventListener("click", () => {
            const seaType = selectRow(item, i, j);
            img.src = seaType;
          });
        } else {
          if (j === 0) {
            if (i !== 4) {
              const cell = document.createElement("td");
              // eslint-disable-next-line no-redeclare
              var span = document.createElement("span");
              span.className = "seaterMobseatNo";
              span.innerText = item.seatNo;
              cell.appendChild(span);
              // eslint-disable-next-line no-redeclare
              var img = document.createElement("img");
              img.className = isMobile ? "seaterMobView" : "seaterWebView";
              img.src = getSeatStatus(item);
              cell.appendChild(img);
              row.appendChild(cell);
              cell.addEventListener("click", () => {
                const seaType = selectRow(item, i, j);
                img.src = seaType;
              });
            } else {
              const cell = document.createElement("td");
              // eslint-disable-next-line no-redeclare
              var img = document.createElement("img");
              img.className = isMobile ? "seaterMobView" : "seaterWebView";
              img.style.visibility = "hidden";
              img.src = getSeatStatus(item);
              cell.appendChild(img);
              row.appendChild(cell);
            }
          }
          if (j === 1) {
            if (i !== 4 && i !== 5) {
              const cell = document.createElement("td");
              // eslint-disable-next-line no-redeclare
              var span = document.createElement("span");
              span.className = "seaterMobseatNo";
              span.innerText = item.seatNo;
              cell.appendChild(span);
              // eslint-disable-next-line no-redeclare
              var img = document.createElement("img");
              img.className = isMobile ? "seaterMobView" : "seaterWebView";
              img.src = getSeatStatus(item);
              cell.appendChild(img);
              row.appendChild(cell);
              cell.addEventListener("click", () => {
                const seaType = selectRow(item, i, j);
                img.src = seaType;
              });
            } else {
              const cell = document.createElement("td");
              // eslint-disable-next-line no-redeclare
              var img = document.createElement("img");
              img.className = isMobile ? "seaterMobView" : "seaterWebView";
              img.style.visibility = "hidden";
              img.src = getSeatStatus(item);
              cell.appendChild(img);
              row.appendChild(cell);
            }
          }
          if (j === 2) {
            if (i !== 10) {
              const cell = document.createElement("td");
              // eslint-disable-next-line no-redeclare
              var img = document.createElement("img");
              img.className = isMobile ? "seaterMobView" : "seaterWebView";
              img.style.visibility = "hidden";
              img.src = getSeatStatus(item);
              cell.appendChild(img);
              row.appendChild(cell);
            } else {
              const cell = document.createElement("td");
              // eslint-disable-next-line no-redeclare
              var span = document.createElement("span");
              span.className = "seaterMobseatNo";
              span.innerText = item.seatNo;
              cell.appendChild(span);
              // eslint-disable-next-line no-redeclare
              var img = document.createElement("img");
              img.className = isMobile ? "seaterMobView" : "seaterWebView";
              img.src = getSeatStatus(item);
              cell.appendChild(img);
              row.appendChild(cell);
              cell.addEventListener("click", () => {
                const seaType = selectRow(item, i, j);
                img.src = seaType;
              });
            }
          }
        }
      });
      tblBody.appendChild(row);
    });
    tbl.appendChild(tblBody);
    const data = document.getElementById("data");
    data.appendChild(tbl);
  }

  const getSeatStatus = (item) => {
    let status =
      item.status === "empty"
        ? AvailableSeats
        : item.status === "booked"
          ? BookedSeats
          : null;

    return status;
  };

  const selectRow = (item, i, j) => {
    var result = [];
    if (item.status !== "booked") {
      bookedSeatsNo.push(item.seatNo);
    }

    bookedSeatsNo.forEach(function (item) {
      if (result.indexOf(item) < 0) {
        result.push(item);
      }
    });
    bookedSeatsNo = result;
    // eslint-disable-next-line array-callback-return
    bookedSeatsNo.map((e, i) => {
      if (e === item.seatNo && item.status === "selected") {
        bookedSeatsNo.splice(i, 1);
        setName('');
        setEmail('');
        setMobile('');
      }
    });
    setshowSeatName(bookedSeatsNo.toString());
    setQueue(bookedSeatsNo.length);
    checkConfirmation(bookedSeatsNo.length);
    getBaseFare();
    let status =
      item.status === "empty"
        ? SelectedSeats
        : item.status === "booked"
          ? BookedSeats
          : item.status === "selected"
            ? AvailableSeats
            : null;
    updateSeatStatus(item, i, j);
    return status;
  };

  const getBaseFare = () => {
    setBaseFare(props.busRow.fare * bookedSeatsNo.length);
  };

  const updateSeatStatus = (item, i, j) => {
    let status = item.status;
    if (status === "empty") {
      SeaterDb[i].seats[j].status = "selected";
    }
    if (status === "selected") {
      SeaterDb[i].seats[j].status = "empty";
    }
    getSeatAvailability();
  };


  return (
    <div className="mt-7 mb-7 grid h-full grid-cols-1 gap-5 xl:ml-[430px] xl:mr-[430px] xl:grid-cols-2 ">
      <div className="col-span-1 h-fit w-full xl:col-span-1 2xl:col-span-2">
        <div className="z-20 grid grid-cols-1 gap-5 md:grid-cols-2">
          <Card extra={"mt- !z-5 overflow-hidden"}>
            <div className=" dashCard h-full w-full items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
              <div className=" items-center gap-3">
                <CardBody>
                  <CardTitle tag="h5">
                    {availableSeats} Seats Available
                  </CardTitle>
                  <CardSubtitle className="text-muted">
                    <div className="card-subtitle">
                      <div> Click on seat to select/deselect </div>
                    </div>
                  </CardSubtitle>
                  <CardSubtitle className="hr-line"></CardSubtitle>
                  <Row>
                    <div className="allSeatIcon">
                      <div>
                        <img
                          src={availISeatIcon}
                          className="seatInfoIcon"
                          alt=""
                        />
                        <span className="seatsDetails">Available</span>
                      </div>

                      <div>
                        <img
                          src={filledSeatIcon}
                          className="seatInfoIcon"
                          alt=""
                        />
                        <span className="seatsDetails">Booked</span>
                      </div>

                      <div>
                        <img
                          src={selectedSeatIcon}
                          className="seatInfoIcon"
                          alt=""
                        />
                        <span className="seatsDetails">Selected</span>
                      </div>
                    </div>
                  </Row>
                </CardBody>
                <div
                  id="data"
                  className={isMobile ? "seaterMobTbl" : "seaterMobTbl"}
                ></div>
              </div>
            </div>
          </Card>
          <Card extra={"mt-3 !z-5 overflow-hidden"}>
            <div className=" dashCard h-full w-half items-start justify-between bg-white px-3 py-[20px] hover:shadow-2xl dark:!bg-navy-800 dark:shadow-none dark:hover:!bg-navy-700">
              <CardBody>
                <CardTitle tag="h5">{data[0].serviceName} </CardTitle>
                <CardSubtitle className="hr-line"> </CardSubtitle>
                <CardSubtitle
                  className="boldText"
                >
                  Boarding Info
                </CardSubtitle>
                <CardSubtitle
                  className="text-muted text-capitalize mb-2"
                  tag="h6"
                >
                  Place :
                  <span>

                    {data[0].boardingInfoList[0].placeName}

                  </span>
                </CardSubtitle>
                <CardSubtitle
                  className="text-muted text-capitalize mb-2"
                  tag="h6"
                >
                  Time :
                  <span>

                    {data[0].boardingInfoList[0].placeTime}

                  </span>
                </CardSubtitle>
                <CardSubtitle
                  className="text-muted text-capitalize mb-2"
                  tag="h6"
                >
                  Date :
                  <span>

                    {data[0].journeyDate}

                  </span>
                </CardSubtitle>
                <CardSubtitle className="hr-line"> </CardSubtitle>
                <CardSubtitle
                  className="boldText"
                >
                  Dropping Info
                </CardSubtitle>
                <CardSubtitle
                  className="text-muted text-capitalize mb-2"
                  tag="h6"
                >
                  Place :
                  <span>

                    {data[0].droppingInfoList[0].placeName}

                  </span>
                </CardSubtitle>
                <CardSubtitle
                  className="text-muted text-capitalize mb-2"
                  tag="h6"
                >
                  Time :
                  <span>

                    {data[0].droppingInfoList[0].placeTime}

                  </span>
                </CardSubtitle>
                <CardSubtitle
                  className="text-muted text-capitalize mb-2"
                  tag="h6"
                >
                  Date :
                  <span>

                    {data[0].journeyDate}

                  </span>
                </CardSubtitle>
                <CardSubtitle className="hr-line"> </CardSubtitle>
                <CardSubtitle
                  className="boldText"
                >
                  Fare : <span className="fareInfo"> {"₹" + baseFare}</span>
                </CardSubtitle>
                <CardSubtitle className="hr-line"> </CardSubtitle>
                <CardSubtitle
                  className="boldText"
                >
                  Selected seats :{" "}
                  <span className={showSeatName.length ? "showSeatname" : ""}>
                    {showSeatName}
                  </span>
                </CardSubtitle>
                <CardSubtitle className="hr-line"> </CardSubtitle>
              </CardBody>
              <CardBody>
                <CardTitle tag="h5" className="mt-5">{"Enter your details"}</CardTitle>
                <hr />
                <Row>
                  <Col>
                    <Card>
                      <CardBody>
                        <input
                          disabled={!queue}
                          onChange={(e) => {
                            setName(e.target.value);
                            checkConfirmation(1);
                          }}
                          value={name}
                          placeholder={"Enter your name"}
                          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none`}
                        />
                        <input
                          onChange={(e) => {
                            setEmail(e.target.value);
                            checkConfirmation(1);
                          }}
                          id="emailVal"
                          value={email}
                          disabled={!queue}
                          placeholder={"Enter your email"}
                          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none`}
                        />
                        <input
                          onChange={(e) => {
                            setMobile(e.target.value);
                            checkConfirmation(1);
                          }}
                          disabled={!queue}
                          value={mobile}
                          placeholder={"Enter your mobile"}
                          className={`mt-2 flex h-12 w-full items-center justify-center rounded-xl border bg-white/0 p-3 text-sm outline-none`}
                        />
                        <div className="mt-5 ml-3">
                          <input
                            disabled={!queue}
                            type="radio"
                            id="male"
                            value="male"
                            checked={selectedValue === "male"}
                            onChange={() => handleRadioChange("male")}
                          />
                          <label htmlFor="male" className="radiobtn">
                            Male
                          </label>

                          <input
                            disabled={!queue}
                            type="radio"
                            id="female"
                            value="female"
                            checked={selectedValue === "female"}
                            onChange={() => handleRadioChange("female")}
                          />
                          <label htmlFor="female" className="radiobtn">
                            Female
                          </label>
                        </div>
                      </CardBody>
                    </Card>
                  </Col>
                </Row>

                <div className="mt-7 text-center">
                  <button
                    disabled={!confirmBtn}
                    className={confirmBtn ? "searchbtn" : "searchbtn disbtn"}
                    onClick={() => bookTicket(data[0])}
                  >
                    {" "}
                    Pay{" ₹" + baseFare}
                  </button>
                </div>
              </CardBody>
            </div>

          </Card>

        </div>
      </div>
    </div>
  );
};

export default SeaterView;
