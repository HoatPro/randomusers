import React from "react";
import axios from "axios";
import { Pie, Bar } from "react-chartjs-2";
import { Modal, Button } from "react-bootstrap";
import "./Home.css";

function getGenderData(countMale, countFemale) {
  const data = {
    labels: ["Male", "Female"],
    datasets: [
      {
        label: "People",
        data: [countMale, countFemale],
        backgroundColor: ["#FF6384", "#36A2EB"]
      }
    ]
  };
  return data;
}
function getNationalData(
  countAU,
  countBR,
  countCA,
  countCH,
  countDE,
  countDK,
  countES,
  countFI,
  countFR,
  countGB,
  countIE,
  countIR,
  countNO,
  countNL,
  countNZ,
  countTR,
  countUS
) {
  const data = {
    labels: [
      "AU",
      "BR",
      "CA",
      "CH",
      "DE",
      "DK",
      "ES",
      "FI",
      "FR",
      "GB",
      "IE",
      "IR",
      "NO",
      "NL",
      "NZ",
      "TR",
      "US"
    ],
    datasets: [
      {
        label: "Ratio Count",
        data: [
          countAU,
          countBR,
          countCA,
          countCH,
          countDE,
          countDK,
          countES,
          countFI,
          countFR,
          countGB,
          countIE,
          countIR,
          countNO,
          countNL,
          countNZ,
          countTR,
          countUS
        ],
        backgroundColor: [
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384",
          "#FF6384"
        ]
      }
    ]
  };
  return data;
}

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      users: [],
      genderData: {},
      nationnalData: {},
      showModal: false,
      userData: {}
    };
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  async componentDidMount() {
    const options = {
      method: "GET",
      url: "https://randomuser.me/api/?results=100"
    };
    const {
      status,
      data: { results: users }
    } = await axios(options);
    if (status) {
      const countMale = users.filter(user => user.gender === "male").length;
      const countFemale = users.length - countMale;
      const countAU = users.filter(user => user.nat === "AU").length;
      const countBR = users.filter(user => user.nat === "BR").length;
      const countCA = users.filter(user => user.nat === "CA").length;
      const countCH = users.filter(user => user.nat === "CH").length;
      const countDE = users.filter(user => user.nat === "DE").length;
      const countDK = users.filter(user => user.nat === "DK").length;
      const countES = users.filter(user => user.nat === "ES").length;
      const countFI = users.filter(user => user.nat === "FI").length;
      const countFR = users.filter(user => user.nat === "FR").length;
      const countGB = users.filter(user => user.nat === "GB").length;
      const countIE = users.filter(user => user.nat === "IE").length;
      const countIR = users.filter(user => user.nat === "IR").length;
      const countNO = users.filter(user => user.nat === "NO").length;
      const countNL = users.filter(user => user.nat === "NL").length;
      const countNZ = users.filter(user => user.nat === "NZ").length;
      const countTR = users.filter(user => user.nat === "TR").length;
      const countUS =
        users.length -
        countAU -
        countBR -
        countCA -
        countCH -
        countDE -
        countDK -
        countES -
        countFI -
        countFR -
        countGB -
        countIE -
        countIR -
        countNO -
        countNL -
        countNZ -
        countTR;
      this.setState({
        users,
        genderData: getGenderData(countMale, countFemale),
        nationnalData: getNationalData(
          countAU,
          countBR,
          countCA,
          countCH,
          countDE,
          countDK,
          countES,
          countFI,
          countFR,
          countGB,
          countIE,
          countIR,
          countNO,
          countNL,
          countNZ,
          countTR,
          countUS
        )
      });
    }
  }
  open(user) {

    this.setState({
      showModal: true,
        userData: [
            user.picture.medium,
            user.name.first+user.name.last,
            user.email,
            user.gender,
            user.phone,
          user.nat,
          user.location.street
            ]
    });
  }

  close() {
    this.setState({ showModal: false });
  }

  render() {
    const { users, genderData, nationnalData, userData } = this.state;

    return (
      <div className="wrapper">
        <section className="list-users">
          <table className="table table-hover">
            <thead>
              <tr>
                <td>Image</td>
                <td>Name</td>
                <td>Email</td>
                <td>Phone</td>
                <td>National</td>
              </tr>
            </thead>
            <tbody>
              {users.map((user, index) => {
                return (
                  <tr key={index} onClick={() => {
                    this.open(
                      user
                    );
                  }}>
                    <td>
                      <img src={user.picture.medium} alt="" />
                    </td>
                    <td>
                      <h4>{user.name.first + user.name.last}</h4>
                    </td>
                    <td>
                      <h4>{user.email}</h4>
                    </td>
                    <td>
                      <h4>{user.phone}</h4>
                    </td>
                    <td>
                      <h4>{user.nat}</h4>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <Modal
            className="modal-container"
            show={this.state.showModal}
            onHide={this.close}
            animation={true}
          >
            <Modal.Header closeButton>
              <Modal.Title>Hello</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={userData[0]} alt="" /><br/>
              <label>
                NAME :
                {userData[1]}
              </label>
              <br />
              <label>
                EMAIL :
                {userData[2]}
              </label>
              <br />
              <label>
                GENDER :
                {userData[3]}
              </label>
              <br />
              <label>
                PHONE :
                {userData[4]}
              </label>
              <br />
              <label>
                NATIONAL :
                {userData[5]}
              </label>
              <br />
              <label>
                LOCATION :
                {userData[6]}
              </label>
              <br />
            </Modal.Body>

            <Modal.Footer>
              <Button onClick={this.close}>Close</Button>
            </Modal.Footer>
          </Modal>
        </section>
        <section className="gender-chart">
          <Pie
            data={genderData}
            options={{
              title: {
                display: true,
                text: "Rate Male and Famale in 100 users",
                fontSize: 25
              },
              legend: { display: true, position: "bottom" },
              maintainAspecRatio: false
            }}
          />
        </section>
        <section className="national-chart">
          <Bar
            data={nationnalData}
            options={{
              title: {
                display: true,
                text: "Rate Male and Famale of National in 100 users",
                fontSize: 25
              },
              legend: { display: true, position: "bottom" },
              maintainAspecRatio: false
            }}
          />
        </section>
      </div>
    );
  }
}

export default Home;
