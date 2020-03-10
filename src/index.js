import React from 'react'
import { render } from 'react-dom'
import { CSSTransition, TransitionGroup } from 'react-transition-group'

import { BrowserRouter, Route, Switch, NavLink } from './my-router'

const One = () => <div className="One"></div>
const Two = () => <div className="Two"></div>
const Three = () => <div className="Three"></div>

const App = () => (
  <div>
    <nav className="nav">
      <NavLink to="one">Tomato</NavLink>
      <NavLink to="two">Black</NavLink>
      <NavLink to="three">Teal</NavLink>
    </nav>
    <div className="pages">
      <Route
        render={({ location, timeout = 1000 }) => (
          <TransitionGroup component={null}>
            <CSSTransition
              key={location.pathname}
              classNames="page"
              timeout={timeout}
              onEnter={node => (node.style.transitionDuration = timeout + 'ms')}
            >
              <Switch location={location}>
                <Route path="one" component={One} />
                <Route path="two" component={Two} />
                <Route path="three" component={Three} />
              </Switch>
            </CSSTransition>
          </TransitionGroup>
        )}
      />
    </div>
    <div className="cols">
      <div className="col">
        <div className="card">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Earum,
          facilis?
        </div>
      </div>
      <div className="col">
        <div className="card">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Modi
          asperiores perferendis nam hic veritatis optio eligendi placeat maxime
          impedit iusto! Expedita officia rem, numquam eos deserunt provident
          aliquam ipsam ab!
        </div>
      </div>
      <div className="col">
        <div className="card">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi quis
          accusantium eius aperiam consectetur sequi!
        </div>
      </div>
    </div>
    <div className="after">Some text after columns</div>
  </div>
)

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('app')
)
