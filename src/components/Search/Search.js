import React, { Component, Fragment } from 'react'
// import { withRouter } from 'react-router-dom'
import axios from 'axios'

import apiUrl from './../../apiConfig'

// import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'

import Card from 'react-bootstrap/Card'

class Search extends Component {
  constructor (props) {
    super(props)

    this.state = {
      zip: '',
      weather: null,
      city: null,
      description: null
    }
  }

  // async componentDidMount () {
  // // make http requests
  //   await axios({
  //     url: `${apiUrl}${this.state.zip}`,
  //     method: 'GET'
  //   })
  //     .then(res => this.setState({ zip: res.data.name, weather: res.data.weather[0].main }))
  //     .catch(console.error)
  // }
  // async componentDidMount () {
  //   // we're going to "try" sme things (our request)
  //   try {
  //     const res = await axios(`${apiUrl}${this.state.zip}`)
  //     this.setState({ weather: res.list.weather })
  //   } catch (err) {
  //     // if anything goes wrong in the try block, handle error
  //     console.error(err)
  //   }
  // }

  handleInputChange = (event) => {
    event.persist()
    this.setState({ zip: event.target.value })
  }

  handleSubmit = (event) => {
    event.preventDefault()
    axios.get(`${apiUrl}${this.state.zip}`)
      // .then((res) => {
      //   console.log(res.data)
      //   console.log(res.data.list[0].weather[0].description)
      // })
      .then(res => this.setState({ weather: res.data.list[0].main.temp, city: res.data.city.name, description: res.data.list[0].weather[0].description }))
      // .then(res => this.setState({ city: res.data.city.name }))
      // .then(res => this.setState({ description: res.data.list[0].weather.description }))
      .catch(console.error)
    // axios({
    //   method: 'GET',
    //   url: `${apiUrl}${this.state.zip}`,
    //   data: { weather: this.state.zip }
    // })
    //   .then(res => console.log(res))
    //   .then(res => this.setState({ zip: res.list.weather }))
    //   .catch(console.error)
  }

  render () {
    let weatherDisplay
    const { weather, city, description } = this.state
    if (!weather && !city && !description) {
      weatherDisplay = ''
    } else {
      weatherDisplay = (
        <Fragment>
          <h3>The weather in {city} right now:</h3>
          <h5>Current temperature: {weather}°F</h5>
          <p>Expect {description}</p>
        </Fragment>
      )
    }
    // const { zip } = this.state
    // const weatherJSX = (
    //   <Fragment>
    //     <h3>Current temp: {this.weather}</h3>
    //   </Fragment>
    // )

    return (
      <div>
        <div className="row">
          <div className="col-sm-10 col-md-8 mt-5 mx-2">
            <Form.Group controlId="zip">
              <Form onSubmit={this.handleSubmit} inline>
                <FormControl
                  type="text"
                  className="mr-sm-2 mx-auto"
                  required
                  name="zip"
                  value={this.state.zip}
                  placeholder="Enter zip code"
                  onChange={this.handleInputChange}
                />
                <Button type="submit" variant="outline-primary">Search</Button>
              </Form>
            </Form.Group>
          </div>
        </div>
        <Card
          variant="light"
          bg="light"
          style={{ width: '50%', height: '60%' }}
          className="mx-auto mt-5"
        >
          <Card.Header>#Weather or #Not</Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Text>
              {weatherDisplay}
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    )
  }
}

export default Search
