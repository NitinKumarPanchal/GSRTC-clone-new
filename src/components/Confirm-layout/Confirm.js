import { isMobile } from "react-device-detect";
import animation from "../../assets/img/seats/2yqT.gif";
import Card from "components/card";
import { CardBody} from "reactstrap";

const Confirm = (props) => {
  const result = props.data[0];
  return (
    <Card>
      <CardBody>
        <div className="containerx">
          {isMobile ? (
            <>
              {" "}
              <img src={animation} width={"300px"} alt="" />
            </>
          ) : (
            <div style={{ display: "flex" }}>
              <img src={animation} width={"300px"} alt="" />
              <img src={animation} width={"300px"} alt="" />
              <img src={animation} width={"300px"} alt="" />
              <img src={animation} width={"300px"} alt="" />
              <img src={animation} width={"300px"} alt="" />
              <img src={animation} width={"320px"} alt="" />
            </div>
          )}

          <div className="centered">
            <h1 className="congr">Congratulation</h1>
            <h5
              style={{
                fontFamily: "sans-serif",
                fontSize: "large",
                color: "green",
              }}
            >
              Your Booking is Confirmed
            </h5>
            <p className={isMobile ? "confirmp" : ""}>
              *GSRTC m-Ticket* {result.boardingInfoList.placeName} to{" "}
              {result.droppingInfoList.placeName}
              {"   "} {"  "}Name:{result.reservationDetails.name}
              TripCode:{result.tripCode} PNRNO/OB:{result.PNR}
              DOJ:{result.boardingInfoList.dt},EXPRESSSeatNo:{" "}
              {result.reservationDetails.seats}:
              {result.boardingInfoList.placeName}
              Txn Pass:kFG86TgH Carry ID during jrny. T&C apply.
            </p>
            <a href="/" className="nav-link text-muted">
              Home
            </a>
          </div>
        </div>
      </CardBody>
    </Card>
  );
};

export default Confirm;
