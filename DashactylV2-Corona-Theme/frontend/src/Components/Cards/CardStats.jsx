import React from 'react';
import PropTypes from 'prop-types';

export default function CardStats({
	statSubtitle,
	statTitle,
	isLoading,
}) {
	return (
		<>
		   <div className="col-xl-3 col-sm-6 grid-margin stretch-card">
                <div className="card">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-9">
                        <div className="d-flex align-items-center align-self-start">
                          <h3 className="mb-0">{statSubtitle}</h3>
                        </div>
                      </div>
                    </div>
					{isLoading ?
					  <h6 className="text-muted font-weight-normal">Loading</h6>
					: <h6 className="text-muted font-weight-normal">{statTitle}</h6>
    }
                  </div>
                </div>
              </div>
		</>
	);
}

CardStats.defaultProps = {
	statSubtitle: 'Traffic',
	statTitle: '350,897',
	statArrow: 'up',
	statPercent: '3.48',
	statPercentColor: 'text-emerald-500',
	statDescripiron: 'Since last month',
	statIconName: 'far fa-chart-bar',
	statIconColor: 'bg-red-500',
};

CardStats.propTypes = {
	statSubtitle: PropTypes.string,
	statTitle: PropTypes.string,
	statArrow: PropTypes.oneOf(['up', 'down']),
	statPercent: PropTypes.string,
	// can be any of the text color utilities
	// from tailwindcss
	statPercentColor: PropTypes.string,
	statDescripiron: PropTypes.string,
	statIconName: PropTypes.string,
	// can be any of the background color utilities
	// from tailwindcss
	statIconColor: PropTypes.string,
};
