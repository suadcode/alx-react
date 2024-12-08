import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { StyleSheet, css } from 'aphrodite';
import { connect } from 'react-redux';
import BodySectionWithMarginBottom from '../BodySection/BodySectionWithMarginBottom';
import BodySection from '../BodySection/BodySection';
import CourseList from '../CourseList/CourseList';
import Login from '../Login/Login';
import Notifications from '../Notifications/Notifications';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { AppContext, defaultUser } from './AppContext.js';
import { displayNotificationDrawer, hideNotificationDrawer, loginRequest, logout } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: defaultUser,
      listCourses: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 },
      ],
      listNotifications: [
        { id: 1, type: 'default', value: 'New course available' },
        { id: 2, type: 'urgent', value: 'New resume available' },
        { id: 3, type: 'urgent', html: { __html: '<strong>Urgent requirement</strong> - complete by EOD' } },
      ]
    };
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = (event) => {
    if (event.ctrlKey && event.key === 'h') {
      alert('Logging you out');
      this.props.logout();
    }
  }

  render() {
    const { user, listCourses, listNotifications } = this.state;
    const { isLoggedIn, displayDrawer, displayNotificationDrawer, hideNotificationDrawer, login } = this.props;

    const handleLogIn = (email, password) => {
      login(email, password);
    };

    const handleMarkNotificationAsRead = (id) => {
      this.setState(prevState => ({
        listNotifications: prevState.listNotifications.filter(notification => notification.id !== id)
      }));
    };

    return (
      <AppContext.Provider value={{ user, logOut: this.props.logout }}>
        <div className={css(styles.app)}>
          <Notifications
            displayDrawer={displayDrawer}
            listNotifications={listNotifications}
            handleDisplayDrawer={displayNotificationDrawer}
            handleHideDrawer={hideNotificationDrawer}
            markNotificationAsRead={handleMarkNotificationAsRead}
          />
          <Header />
          <BodySectionWithMarginBottom title={isLoggedIn ? "Course list" : "Log in to continue"}>
            {isLoggedIn ? <CourseList listCourses={listCourses} /> : <Login logIn={handleLogIn} />}
          </BodySectionWithMarginBottom>
          <BodySection title="News from the School">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vel ex a arcu condimentum semper et vitae ipsum.</p>
          </BodySection>
          <Footer />
        </div>
      </AppContext.Provider>
    );
  }
}

const styles = StyleSheet.create({
  app: {
    fontFamily: 'Arial, Helvetica, sans-serif',
    padding: '5px 10px 15px 10px',
  },
  header: {
    display: 'flex',
    borderBottom: '2px solid red',
    color: 'red',
    alignItems: 'center',
    ' img': {
      height: '180px',
      margin: '5px',
    },
  },
  body: {
    padding: '45px',
    minHeight: '250px',
  },
  footer: {
    display: 'flex',
    justifyContent: 'center',
    borderTop: '2px solid red',
    fontStyle: 'italic',
  },
  input: {
    marginRight: '10px',
  },
});

const mapStateToProps = (state) => ({
  isLoggedIn: state.get('isUserLoggedIn'),
  displayDrawer: state.get('isNotificationDrawerVisible'),
});

const mapDispatchToProps = {
  displayNotificationDrawer,
  hideNotificationDrawer,
  login: loginRequest,
  logout,
};

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  displayDrawer: PropTypes.bool,
  displayNotificationDrawer: PropTypes.func,
  hideNotificationDrawer: PropTypes.func,
  login: PropTypes.func,
  logout: PropTypes.func,
};

App.defaultProps = {
  isLoggedIn: false,
  displayDrawer: false,
  displayNotificationDrawer: () => {},
  hideNotificationDrawer: () => {},
  login: () => {},
  logout: () => {},
};

export { mapStateToProps };
export default connect(mapStateToProps, mapDispatchToProps)(App);
