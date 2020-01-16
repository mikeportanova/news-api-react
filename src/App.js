import React from 'react';
import logo from './logo.svg';
import './App.css';
import { isTemplateElement } from '@babel/types';
import { original } from 'immer';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';


const newsAPIKEY = "51a8bd12faa74528a1ca404e5116fec1"
const originalEndpoint = "https://newsapi.org/v2/top-headlines?country=us&apiKey="+newsAPIKEY



// Make it so when I tap on a link, it displays the item.content to the right
function NewsItem(props) {
  

  return (
    <Card style={{ width: '40rem'}}>
      <Card.Img variant="top" src={props.imageURL}/>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
        <Card.Link href={props.url}>Read More</Card.Link>
      </Card.Body>
    </Card>





    // <div id={props.id} className="News-item">
    //   <img src={props.imageURL}/>
    //   <h2>{props.title}</h2>
    //   <span>{props.description}</span>
    // </div>
  )
}

function NewsDescription(props) {
  return (
    <div>
      <span>{props.content}</span>
    </div>
  )
}

function NewsList(props) {  

  return (
    <div>
    <ul className="News-list">
      {props.items.map((item) => (
        <li key={item.author + item.publishedAt}>
        <NewsItem imageURL = {item.urlToImage} 
                  title = {item.title} 
                  description = {item.description} 
                  url = {item.url}
                  key={item.author + item.publishedAt}/>
        </li> 
      ))}
    </ul>
    </div>
  )
      }

function SearchQuery(props) {
  return (
      <form onSubmit={props.onSubmit}>
        <label>
          Search Query: 
          <input
            type="text"
            onChange={props.onChange}
            value={props.value}
          />
        </label>

        <input type="submit" value="Submit"/>
      </form>
  )
}



class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newData:false,
      search:"",
      items: [],
      endpoint: originalEndpoint
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  getData(endpoint,search) {
    fetch(endpoint+search)
        .then((response) => response.json())
        .then(
          (result) => {
            this.setState({
              items: result.articles
            })
          }
        )
  }
  componentDidMount() {
    this.getData(this.state.endpoint?this.state.endpoint:originalEndpoint,this.state.search)
  }

  handleChange = (event) => {
    console.log("Handling Change: ", event)
    const target = event.target;
    const value = target.value;
    this.setState({
      [value]: value,
      search: value+"&apiKey="+newsAPIKEY,
      endpoint:"https://newsapi.org/v2/everything?q=",
      newData: value===""?false:true
  },() => this.getData(this.state.newData?this.state.endpoint : originalEndpoint,value?this.state.search:""))
  }

  handleSubmit = (event) => {
    event.preventDefault()

  }

  render() {
    console.log("Current State: ", this.state)
    return (
    <div>
      <SearchQuery onSubmit = {this.handleSubmit} onChange={this.handleChange} value={this.state.value}/>
      <NewsList items={this.state.items}/>
      {console.log("Search: " + this.state.search,"Endpoint: " +this.state.endpoint)}
    </div>
  )
    }
}


// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> FUCK save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

export default App;
