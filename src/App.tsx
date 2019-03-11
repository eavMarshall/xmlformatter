import React, { Component, EventHandler, ChangeEvent } from "react";
import logo from "./logo.svg";
import "./App.css";

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

class App extends Component {

  uploadFile(event: ChangeEvent<HTMLInputElement>) {
    if (event != null && event.target != null && event.target.files !== null) {
      var files = event.target.files;
      Array.from(files).forEach(file => {
        var fileReader = new FileReader();
        fileReader.onload = () => {
          console.log(fileReader.result);
        };
        
        fileReader.readAsText(file);
      });
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <input type="file" name="xml" multiple onChange={this.uploadFile}/>
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
