import HomePage from './pages/HomePage';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import ResearchesPage from './pages/ResearchesPage';
import ContactPage from './pages/ContactPage'
import background from './images/background.jpg';
import hamburger from './images/hamburger.png';
import breakpoint from './breakpoints';
import styled from 'styled-components';
import { useState } from 'react';

const Header = styled.header`
  position: absolute;
  width: 100%;
  height: 80px;
  background-color: #708b95;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 30px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.22);
`;

const HomeButton = styled.button`
  color: #fefcef;
  font-weight: bold;
  text-decoration: none;
`;

const Hamburger = styled.button`
  width: 30px;
  height: 30px;
  background-image: url(${hamburger});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  @media ${breakpoint.sm}{
    display: none;
  }
`;

const Navs = styled.div`
  display: none;

  @media ${breakpoint.sm} {
    display: flex;
  }
`;

const Nav = styled(Link)`
  text-decoration: none;
  transition: all 0.4s;
  padding: 0 0 0 30px;
  font-weight: ${props => props.isChosen ? 'bold' : 'medium'};
  color: ${props => props.isMatchedTab ? '#023552' : '#fefcef'};
`;

const MobileNavWrapper = styled.div`
  width: 100%;
  position: absolute;
  top: 80px;
  left: 0;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  background-color: #708b95;
  height: ${props => props.open ? '140px' : '0px'};
  transition: all 0.4s ease-out;
`;

const MobileNav = styled(Link)`
  color: #fefcef;
  text-decoration: none;
  opacity: 0;
  transition: all 0.4s;
  padding: 0 0 0 30px;
  height: 0;

  ${props => props.open &&`
    opacity: 1;
    height: 20px;
    padding: 20px 0 20px 30px;
  `};
`;

const BodyContainer = styled.div`
  height: 100%;
  min-height: 100vh;
  background-image: url(${background});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  padding: 100px 40px 50px 40px;
`;

const tabs = [{
  id: "home",
  name: "HOME",
}, {
  id: "researches",
  name: "RESEARCH",
}, {
  id: "contact",
  name: "CONTACT"
}];

function App() {
  const [open, setOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState(tabs[0].id);

  return (
    <Router>
      <Header open={open}>
        <HomeButton to="/">
          KEKE WEB
        </HomeButton>
        <Navs>
          {tabs.map(tab => {
            const isMatchedTab = tab.id === currentTab;

            return(
            <Nav 
              onClick={() => setCurrentTab(tab.id)}
              isMatchedTab={isMatchedTab}
              key={tab.id}
              to={`/${tab.id}`}>
              {tab.name}
            </Nav>
          )})}
        </Navs>
        <Hamburger onClick={() => setOpen(!open)} />
        <MobileNavWrapper open={open}>
          {tabs.map(tab => (
            <MobileNav
              key={tab.id}
              onClick={() => setOpen(false)}
              open={open} 
              to={`/${tab.id}`}>
              {tab.name}
            </MobileNav>
          ))}
        </MobileNavWrapper>
      </Header>
      <BodyContainer>
        <Switch>
          <Route path="/contact">
            <ContactPage />
          </Route>
          <Route path="/researches">
            <ResearchesPage />
          </Route>
          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </BodyContainer>
    </Router>
  );
}

export default App;
