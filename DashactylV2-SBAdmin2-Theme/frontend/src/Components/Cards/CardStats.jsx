import React from 'react';
import PropTypes from 'prop-types';

export default function CardStats({
	statSubtitle,
	statTitle,
	isLoading,
}) {
	return (
		<>
		<div className="col mr-2">
          <div className="text-xs font-weight-bold text-warning text-uppercase mb-1">{statSubtitle}</div>
           <div className="h5 mb-0 font-weight-bold text-gray-800">{isLoading ?
					  <span>Loading</span>
					: <span>{statTitle}</span>
				}</div>
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
