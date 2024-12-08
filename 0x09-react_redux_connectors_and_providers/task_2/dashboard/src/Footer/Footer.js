import React from 'react';
import { connect } from 'react-redux';
import { getFooterCopy, getFullYear } from '../utils/utils.js';
import './Footer.css';

const Footer = ({ user }) => {
  return (
    <footer className="App-footer">
      <p>Copyright {getFullYear()} - {getFooterCopy(true)}</p>
      {user.isLoggedIn && <p><a href="#">Contact us</a></p>}
    </footer>
  );
};

const mapStateToProps = (state) => ({
  user: state.get('user'),
});

export default connect(mapStateToProps)(Footer);
