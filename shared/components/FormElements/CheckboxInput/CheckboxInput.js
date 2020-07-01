import React from 'react';
import { Checkbox } from 'material-ui';
import { Field } from 'redux-form';

import FieldSetLayout from '../FieldSetLayout';

const InnerComp = ({ input, config, ...props }) => (
	<FieldSetLayout {...props}>
		<Checkbox {...config} checked={!!input.value} onCheck={input.onChange} />
	</FieldSetLayout>
);

const CheckboxInput = props => <Field {...props} component={InnerComp} />;

export default CheckboxInput;
