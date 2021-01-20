import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Landing from './pages/Landing'

function Router() {
    return(
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Landing} />
            </Switch>
        </BrowserRouter>
    )
}

export default Router