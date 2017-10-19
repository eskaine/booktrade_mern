import React from 'react';

const Footer = props => (
      <footer className="footer">
        <div className="container">
          <span className="text-muted">
            <a href={props.externalURL} target="__blank">{props.linkName}</a>
          </span>
        </div>
      </footer>
)

export default Footer;
