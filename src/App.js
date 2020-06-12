import React from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom'
import GalleryContainer from './Components/GalleryContainer';
import ViewerContainer from './Components/ViewerContainer';

export default function App() {
  return (
    <div className="App">
      <a className="AppHeader" href='/'>
        futuBrowser
      </a>
      <BrowserRouter>
        <Switch>
          <Route exact path="/gallery" component={GalleryContainer} />
          <Route path="/gallery/:page" component={GalleryContainer}/>
          <Route exact path="/" render={() => (<Redirect to="/gallery" />)} /> 
          
          <Route path="/view/:id" component={ViewerContainer}/>
        
          <Route path="*" render={() => (<Redirect to="/gallery" />)} />
        </Switch>
      </BrowserRouter>
      
    </div>
  );
}
