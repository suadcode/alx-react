import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, css } from 'aphrodite';
import holbertonLogo from '../assets/holberton-logo.png';
import { logout } from '../actions/authActions';

const Header = ({ user, logout }) => {
  return (
    <header className={css(styles.header)}>
      <img src={holbertonLogo} className={css(styles.img)} alt="Holberton logo" />
      <h1>School dashboard</h1>
      {user.isLoggedIn && (
        <div id="logoutSection" className={css(styles.logoutSection)}>
          Welcome {user.email} (<span onClick={logout} className={css(styles.logoutLink)}>logout</span>)
        </div>
      )}
    </header>
  );
};

const styles = StyleSheet.create({
  header: {
    display: 'flex',
    borderBottom: '2px solid red',
    color: 'red',
    alignItems: 'center',
  },
  img: {
    height: '180px',
    margin: '5px',
  },
  logoutSection: {
    marginLeft: 'auto',
    marginRight: '10px',
    fontSize: '1rem',
  },
  logoutLink: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },
});

const mapStateToProps = (state) => ({
  user: state.get('user'),
});

const mapDispatchToProps = {
  logout,
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
