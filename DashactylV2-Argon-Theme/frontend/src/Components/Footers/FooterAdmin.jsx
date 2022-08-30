import React from 'react';

export default function FooterAdmin() {
	return (
		<>
	 <footer className="footer">
        <div className="row align-items-center justify-content-xl-between">
          <div className="col-xl-6">
            <div className="copyright text-center text-xl-left text-muted">
              &copy; 2022 <a href="https://www.creative-tim.com" className="font-weight-bold ml-1" target="_blank" rel="noreferrer">AcktarCodes, Creative Tim</a>
            </div>
          </div>
          <div className="col-xl-6">
            <ul className="nav nav-footer justify-content-center justify-content-xl-end">
              <li className="nav-item">
                <a href="https://www.creative-tim.com" className="nav-link" target="_blank" rel="noreferrer">Creative Tim</a>
              </li>
              <li className="nav-item">
                <a href="https://www.creative-tim.com/presentation" className="nav-link" target="_blank" rel="noreferrer">About Us</a>
              </li>
              <li className="nav-item">
                <a href="http://blog.creative-tim.com" className="nav-link" target="_blank" rel="noreferrer">Blog</a>
              </li>
              <li className="nav-item">
                <a href="https://github.com/creativetimofficial/argon-dashboard/blob/master/LICENSE.md" className="nav-link" target="_blank" rel="noreferrer">MIT License</a>
              </li>
            </ul>
          </div>
        </div>
      </footer>
		</>
	);
}
