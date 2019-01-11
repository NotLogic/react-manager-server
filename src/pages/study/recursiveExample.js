import React from 'react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

const PEEPS = [
  {
    id: 0,
    name: 'Michelle',
    friends: [1, 2, 3]
  },
  {
    id: 1,
    name: 'Sean',
    friends: [0, 3]
  },
  {
    id: 2,
    name: 'Kim',
    friends: [0, 1, 3]
  },
  {
    id: 3,
    name: 'David',
    friends: [1, 2]
  }
]
function find(id) {
  let ret = ''
  ret = PEEPS.find(function(p){
    return p.id == id
  })
  return ret
}
function RecursiveExample () {
  return (
    <Router>
      <Person match={{params: {id: 0}, url: ''}} />
    </Router>
  );
}
function Person({match}){
  let id = match.params.id
  let person = find(id)
  return (
    <div>
      <h3>
        {person.name}'s Friends
      </h3>
      <ul>
        {person.friends.map(id=>
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{find(id).name}</Link>
          </li>
        )}
      </ul>
      <Route path={`${match.url}/:id`} component={Person} />
    </div>
  );
}
// 递归路由
export default RecursiveExample