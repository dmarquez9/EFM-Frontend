import React from 'react';
import { Field } from 'redux-form';
import { SelectField, MenuItem } from 'material-ui';
import FieldSetLayout from '../FieldSetLayout';

const InnerComp = ({
	input,
	label,
	meta: { touched, error },
	children,
	// inputConfig,
	// data,
	className,
	inputConfig,
	...custom
}) => (
	<FieldSetLayout className={className}>
		<SelectField
			errorText={touched && error}
			{...input}
			onChange={(event, index, value) => input.onChange(value)}
			children={children}
			{...custom}
			{...inputConfig}
		/>
	</FieldSetLayout>
);

const SelectInput = ({ data, ...props }) => (
	<Field {...props} component={InnerComp}>
		{data.map(el => <MenuItem key={el.key} value={el.value} primaryText={el.name} />)}
	</Field>
);

export default SelectInput;
