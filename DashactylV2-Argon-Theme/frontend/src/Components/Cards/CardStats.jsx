import React from 'react';
import PropTypes from 'prop-types';

export default function CardStats({
	statSubtitle,
	statTitle,
	isLoading,
}) {
	return (
		<>
		  <div className="col">
                <h5 className="card-title text-uppercase text-muted mb-0">{statSubtitle}</h5>
				{isLoading ?
					  <span className="h2 font-weight-bold mb-0">Loading</span>
					: <span className="h2 font-weight-bold mb-0">{statTitle}</span>
				}
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
