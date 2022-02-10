import { useState, useEffect } from 'react';
import { getUser } from './services/fetch-utils';
import {
  BrowserRouter as Router,
  Switch,
  NavLink,
  Route,
  Redirect,
} from 'react-router-dom';
import AuthPage from './AuthPage';
import DetailPage from './DetailPage';
import ListPage from './ListPage';
import CreatePage from './CreatePage';

import './App.css';
import { logout } from './services/fetch-utils';

export default function App() {
  
  // You'll need to track the user in state
  const [user, setUser] = useState(localStorage.getItem('supabase.auth.token'));
  // add a useEffect to get the user and inject the user object into state on load
  useEffect(() => {
    async function fetchUser() {
      const user = await getUser();

      if (user) setUser(user);
    }
    fetchUser();
  }, []);

  async function handleLogout() {
    // call the logout function
    <div className='logout'>
      <button onClick={logout}>Logout</button>
    </div>;
    setUser('');
    // clear the user in state
  }

  return (
    <Router>
      <div className='App'>
        <header>
          {
            // user && 
            <><NavLink to="/Game">Board Game List</NavLink><NavLink to="/CreatePage">Create Game</NavLink><button onClick={handleLogout}>Logout Button</button></>}
          {/* if there is a user in state, render out a link to the board games list, the create page, and add a button to let the user logout */}
        </header>
        
        <main>
          <Switch>
            <Route exact path="/">
              {
                user 
                  ? <Redirect to="/ListPage" />
                  : <AuthPage setUser={setUser} />
              }
              
              {/* if there is a user, redirect to the board games list. Otherwise, render the auth page. Note that the AuthPage will need a function called setUser that can set the user state in App.js */}
            </Route>
            <Route exact path="/board-games">
              {
                user
                  ? <ListPage />
                  : <AuthPage setUser={setUser} />
              }
              {/* if there is a user, render the board games list. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/board-games/:id">
              {
                user
                  ? <DetailPage />
                  : <AuthPage setUser={setUser} />
              }
              {/* if there is a user, render the detail page. Otherwise, redirect to the home route/auth page */}
            </Route>
            <Route exact path="/create">
              {
                user
                  ? <CreatePage />
                  : <AuthPage setUser={setUser} />
              }
              {/* if there is a user, render the create page. Otherwise, redirect to the home route/auth page */}
            </Route>
          </Switch>
        </main>
      </div>
    </Router>
  );
}