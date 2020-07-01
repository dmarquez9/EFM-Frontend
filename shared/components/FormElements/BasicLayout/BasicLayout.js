import React from 'react';

const BasicLayout = ({ title, onSubmit, children, withLayout, className }) => (
	// const classes = className ? `${className} boxwhite form` : 'boxwhite form'
	<form onSubmit={onSubmit}>
		{withLayout && (
			<div className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 col-xs-12">
				{title && <h2 className="title">{title}</h2>}
				<div className={className}>{children}</div>
			</div>
		)}
		{!withLayout && <div className={className}>{children}</div>}
	</form>
);

BasicLayout.defaultProps = {
	withLayout: true,
};
export default BasicLayout;
