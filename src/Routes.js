import React from 'react'
import {Switch, Route} from 'react-router-dom'
import Searcher from './components/Searcher';

const Routes = ()=>{
  return(
    <Switch>
      <Route exact path='/' component={Searcher}/>
      <Route path='/tienda/:filter' component={Searcher}/>
    </Switch>
  )
}

export default Routes