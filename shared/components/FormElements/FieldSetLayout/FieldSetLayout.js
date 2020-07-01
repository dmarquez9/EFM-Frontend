import React from 'react';
import FormError from '../FormError';

const FieldSetLayout = ({ label, legend, meta, children, labelStyle, ...props }) => (
	<section {...props}>
		{label && <label className={labelStyle}>{label}</label>}
		{children}
		{legend && <p className="legend">{legend}</p>}
		<FormError {...meta} />
	</section>
);

export default FieldSetLayout;
