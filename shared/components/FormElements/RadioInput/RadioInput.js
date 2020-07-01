import React from 'react';
import { RadioButtonGroup, RadioButton } from 'material-ui';
import { Field } from 'redux-form';

import FieldSetLayout from '../FieldSetLayout';

const InnerComp = ({ input, className, ...rest }) => (
	<FieldSetLayout className={className}>
		<RadioButtonGroup
			{...input}
			{...rest}
			valueSelected={input.value}
			onChange={(event, value) => input.onChange(value)}
		/>
	</FieldSetLayout>
);

const RadioInput = ({ data, ...props }) => (
	<Field {...props} component={InnerComp}>
		{data.map(el => <RadioButton {...el} key={el.value} />)}
	</Field>
);

export default RadioInput;
