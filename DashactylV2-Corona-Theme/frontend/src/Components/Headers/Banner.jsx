import React from 'react';
import banner from '../../Assets/images/dashboard/Group126@2x.png';
export default function Banner() {
	return (
		<>
		 <div className="row">
              <div className="col-12 grid-margin stretch-card">
                <div className="card corona-gradient-card">
                  <div className="card-body py-0 px-0 px-sm-3">
                    <div className="row align-items-center">
                      <div className="col-4 col-sm-3 col-xl-2">
                        <img src={banner} className="gradient-corona-img img-fluid" alt=""/>
                      </div>
                      <div className="col-5 col-sm-7 col-xl-8 p-0">
                        <h4 className="mb-1 mb-sm-0">Want even more features?</h4>
                        <p className="mb-0 font-weight-normal d-none d-sm-block">Join my Discord server!</p>
                      </div>
                      <div className="col-3 col-sm-2 col-xl-2 ps-0 text-center">
                        <span>
                          <a href="https://discord.gg/McFr2jwNSE" target="_blank" className="btn btn-outline-light btn-rounded get-started-btn" rel="noreferrer">JOIN NOW</a>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
		</>
	);
}