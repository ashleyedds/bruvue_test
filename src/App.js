import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

//Imports information from API
import API from "./utils/API.js";

//Imports components from reactstrap to use
import { Container, Row, Col, Button, Modal, ModalHeader, ModalBody, ModalFooter, ListGroup, ListGroupItem, Badge, Dropdown, DropdownToggle, DropdownMenu } from "reactstrap";

//Imports specific components to use in the app
import NavBar from "./components/NavBar";
import AlbumCard from './components/AlbumCard';
import DropDownItem from "./components/DropDownItem";



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      beer: [],
      breweries: [],
      beerList: [],
      viewBru: [],
      modal: false,
      dropdownOpen1: false,
      dropdownOpen2: false,
      dropdownOpen3: false,
      dropdownOpen4: false,
      dropdownOpen5: false,
      dropdownOpen6: false,
      brewAE: [],
      brewFK: [],
      brewLQ: [],
      brewRV: [],
      brewWZ: [],
      brewNum: [],
      sortedBrewery: []
    };

    //Modal toggle (reactStrap)
    this.toggle = this.toggle.bind(this);

    //Dropdown binding (reactstrap)
    this.toggleAE = this.toggleAE.bind(this);
    this.toggleFK = this.toggleFK.bind(this);
    this.toggleLQ = this.toggleLQ.bind(this);
    this.toggleRV = this.toggleRV.bind(this);
    this.toggleWZ = this.toggleWZ.bind(this);
    this.toggleNum = this.toggleNum.bind(this);
  }

  //Toggle for the modal
  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  //Make the dropdown work for each specific menu (reactstrap)
  toggleAE() {
    this.setState(prevState => ({
      dropdownOpen1: !prevState.dropdownOpen1
    }));
  }

  toggleFK() {
    this.setState(prevState => ({
      dropdownOpen2: !prevState.dropdownOpen2
    }));
  }

  toggleLQ() {
    this.setState(prevState => ({
      dropdownOpen3: !prevState.dropdownOpen3
    }));
  }

  toggleRV() {
    this.setState(prevState => ({
      dropdownOpen4: !prevState.dropdownOpen4
    }));
  }

  toggleWZ() {
    this.setState(prevState => ({
      dropdownOpen5: !prevState.dropdownOpen5
    }));
  }

  toggleNum() {
    this.setState(prevState => ({
      dropdownOpen6: !prevState.dropdownOpen6
    }));
  }


  //Load all the data from the API once the page loads and initiate the process to make it pretty. Runs alphabrew function, which helps us sort and lump the breweries by their beginning letter for easier perusing
  componentDidMount() {

    Promise.all([
      API.searchBeer()
    ])
      .then(res => {
        this.setState({ beer: res[0].data });
        this.transformData();
        this.alphaBrew();
      });

  }

  //Takes data from API, grabs only the brewery names, and gets rid of the duplicates
  transformData = () => {

    const breweryArray = this.state.beer.map(data => {
      return data["Brewery Name"];
    });

    let uniqueBreweries = [];

    uniqueBreweries = breweryArray.filter((item, pos) => {
      return breweryArray.indexOf(item) === pos;
    });

    this.setState({
      breweries: uniqueBreweries
    });

  }

  //When a specific brewery is selected, this function takes the brewery name and uses it to find more details to display to the user from our larger data set. Toggles the modal to display the beer information at the selected brewery
  breweryView = (brewery) => {
    const viewBru = this.state.beer.filter(beer => {
      return brewery === beer["Brewery Name"]
    });

    const beerList = viewBru.map(data => {
      return [data["Beer Name"], data["Beer Style"], data["ABV"], data["IBU"]]
    });

    this.setState({
      viewBru: viewBru,
      albumTitle: viewBru[0]["Brewery Name"],
      beerList: beerList
    });

    this.toggle();
  }

  //Finds the brewery name from the larger array of beer, gets rid of the duplicates, and lumps them according to the specified alphabetical/numerical groups
  alphaBrew = () => {
    const alphaBrews = this.state.beer.map(beer => {
      return beer["Brewery Name"]
    })

    const uniqueAlphaBrews = alphaBrews.sort().filter((item, pos) => {
      return alphaBrews.indexOf(item) === pos;
    });

    //Takes in beginning letters as arguments and searches the array for those breweries that begin with that letter. Used to populate the drop down menus
    const specifyAlpha = (...args) => {
      const target = uniqueAlphaBrews.filter((brew) => 
      brew.startsWith(args[0]) || 
      brew.startsWith(args[1]) || 
      brew.startsWith(args[2]) || 
      brew.startsWith(args[3]) || 
      brew.startsWith(args[4]) || 
      brew.startsWith(args[5]));
      console.log(target);
      return target;
    }

    const specifyAlphaAE = specifyAlpha("A", "B", "C", "D", "E");
    const specifyAlphaFK = specifyAlpha("F", "G", "H", "I", "J", "K");
    const specifyAlphaLQ = specifyAlpha("L", "M", "N", "O", "P", "Q")
    const specifyAlphaRV = specifyAlpha("R", "S", "T", "U", "V");
    const specifyAlphaWZ = specifyAlpha("W", "X", "Y", "Z");

    //Grabs all of the breweries that begin with a numerical value
    const specifyNumerical = uniqueAlphaBrews.filter((brew) => {
      if (brew.match(/^\d/)) {
        console.log(brew)
        return brew
      }
    });

    this.setState({
      brewAE: specifyAlphaAE,
      brewFK: specifyAlphaFK,
      brewLQ: specifyAlphaLQ,
      brewRV: specifyAlphaRV,
      brewWZ: specifyAlphaWZ,
      brewNum: specifyNumerical
    });
  }

  //When a user selects a specific brewery name from the drop down, this function grabs that brewery from the larger display to display only its card (called in the app down below) and the information that belongs to it
  specificBrewery = (brewery) => {
      const specificBrew = this.state.beer.filter(final => {
      return brewery === final["Brewery Name"]
    });

    this.setState({
      sortedBrewery: specificBrew[0],
      breweries: []
    });
  }




  render() {
    return (
      <Container className="album-container">

        <NavBar />

        <Row className="dropDown-row">
          <Col>
            <Dropdown isOpen={this.state.dropdownOpen1} toggle={this.toggleAE}>
              <DropdownToggle caret>
                Breweries A-E
              </DropdownToggle>
              <DropdownMenu>
                {this.state.brewAE.map(brewery => (
                  <DropDownItem
                    brewery={brewery}
                    specificBrewery={this.specificBrewery}
                  />
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown isOpen={this.state.dropdownOpen2} toggle={this.toggleFK}>
              <DropdownToggle caret>
                Breweries F-K
              </DropdownToggle>
              <DropdownMenu>
                {this.state.brewFK.map(brewery => (
                  <DropDownItem
                    brewery={brewery}
                    specificBrewery={this.specificBrewery}
                  />
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown isOpen={this.state.dropdownOpen3} toggle={this.toggleLQ}>
              <DropdownToggle caret>
                Breweries L-Q
              </DropdownToggle>
              <DropdownMenu>
                {this.state.brewLQ.map(brewery => (
                  <DropDownItem
                    brewery={brewery}
                    specificBrewery={this.specificBrewery}
                  />
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown isOpen={this.state.dropdownOpen4} toggle={this.toggleRV}>
              <DropdownToggle caret>
                Breweries R-V
              </DropdownToggle>
              <DropdownMenu>
                {this.state.brewRV.map(brewery => (
                  <DropDownItem
                    brewery={brewery}
                    specificBrewery={this.specificBrewery}
                  />
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown isOpen={this.state.dropdownOpen5} toggle={this.toggleWZ}>
              <DropdownToggle caret>
                Breweries W-Z
              </DropdownToggle>
              <DropdownMenu>
                {this.state.brewWZ.map(brewery => (
                  <DropDownItem
                    brewery={brewery}
                    specificBrewery={this.specificBrewery}
                  />
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>

          <Col>
            <Dropdown isOpen={this.state.dropdownOpen6} toggle={this.toggleNum}>
              <DropdownToggle caret>
                Numerical Breweries
              </DropdownToggle>
              <DropdownMenu>
                {this.state.brewNum.map(brewery => (
                  <DropDownItem
                    brewery={brewery}
                    specificBrewery={this.specificBrewery}
                  />
                ))}
              </DropdownMenu>
            </Dropdown>
          </Col>
        </Row>


        <Row className="album-row">
          {
            this.state.breweries.map(final => (
              <Col xs="3">

                <AlbumCard
                  breweryName={final}
                  breweryView={this.breweryView}
                />

              </Col>
            ))
          }
        </Row>

        <Row className="album-row">

          <Col xs="4">

            <AlbumCard
              breweryName={this.state.sortedBrewery["Brewery Name"]}
              breweryView={this.breweryView}
            />

          </Col>

        </Row>


        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}>

          <ModalHeader>
            <p>{this.state.albumTitle}</p>
          </ModalHeader>

          <ModalBody>
            <span>Key:   </span>
            <Badge color="primary" pill>Beer Style</Badge>
            <Badge color="success" pill>ABV</Badge>
            <Badge color="warning" pill>IBU</Badge>
            <ListGroup>
              {
                this.state.beerList.map(beer => (
                  <ListGroupItem className="justify-content-between">{beer[0]}
                    <Badge color="primary" pill>{beer[1]}</Badge>
                    <Badge color="success" pill>{beer[2]}</Badge>
                    <Badge color="warning" pill>{beer[3]}</Badge>
                  </ListGroupItem>
                ))
              }
            </ListGroup>

          </ModalBody>

          <ModalFooter>
            <Button color="primary" onClick={this.toggle}>Close</Button>
          </ModalFooter>
        </Modal>

      </Container>
    );
  }
}

export default App;
