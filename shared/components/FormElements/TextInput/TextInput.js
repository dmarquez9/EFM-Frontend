import React from 'react';
import { Field } from 'redux-form';
import { TextField } from 'material-ui';

import FieldSetLayout from '../FieldSetLayout';

const InnerComp = ({ inputConfig, type, required, input, meta: { touched, error }, ...props }) => (
	<FieldSetLayout {...props}>
		<TextField
			required={required}
			type={type}
			{...inputConfig}
			{...input}
			errorText={touched && error}
		/>
	</FieldSetLayout>
);

const TextInput = props => <Field {...props} component={InnerComp} />;

export default TextInput;
