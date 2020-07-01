import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { func, array, bool } from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	Table,
	TableBody,
	TableRow,
	TableRowColumn,
} from 'material-ui/Table';
import styles from './styles.scss';
import { fetchFinances as fetchFinancesAction } from '../../../actions/teams';
import partition from '../../../utils/arrays/splitArray';
import getTransactionByType from '../../../utils/logic/getTransactionByType';
import abbreviateNumber from '../../../utils/logic/abbreviateNumber';
import { PROCESSING } from '../../../constants/requestStatuses';
import { getRequestStatus } from '../../../selectors';
import LoadingBox from '../../LoadingBox';

class Finances extends PureComponent {
	state = { page: 0 };
	componentDidMount = () => {
		const finances = this.props.finances.filter(p => !p.newest);
		if (finances.length === 0)
			this.props.fetchFinances();
	}
	changePage = page => () => {
		if (page !== this.state.page)
			this.setState({ page });
	}
	render() {
		const { finances, loading } = this.props;
		const { page } = this.state;
		if (loading)
			return <LoadingBox />;
		return (
			<div className={styles.finances}>
				<div className={styles.latest}>
					<div className={styles.title}>
						<div><h4>Ultimas transacciones</h4></div>
						<div className={styles.pages}>
							{page > 0 && (
								<a onClick={this.changePage(page - 1)}>
									<FontAwesomeIcon icon="angle-left" />
								</a>
							)}
							{this.props.finances.map((_, index) => (
								<a
									className={page === index ? styles.active : null}
									key={index}
									onClick={this.changePage(index)}
								>
									{index + 1}
								</a>
							))}
							{page < this.props.finances.length - 1 && (
								<a onClick={this.changePage(page + 1)}>
									<FontAwesomeIcon icon="angle-right" />
								</a>
							)}
						</div>
					</div>
					{finances.length === 0 && (
						<div className={styles.noFinances}>
							<div><FontAwesomeIcon icon="receipt" /></div>
							<span>No tienes un historial de finanzas</span>
						</div>
					)}
					{finances.length > 0 && (
						<Table selectable={false}>
							<TableBody displayRowCheckbox={false} showRowHover>
								{finances[page].map((finance) => {
									const { className, status, icon, message } = getTransactionByType(finance);
									return (
										<TableRow key={finance.id}>
											<TableRowColumn className={styles.colIcon}>
												<div className={styles[className]}>
													<FontAwesomeIcon icon={icon} />
												</div>
											</TableRowColumn>
											<TableRowColumn className={styles.colDesc}>
												{message}
											</TableRowColumn>
											<TableRowColumn className={styles.colDate}>
												{moment(finance.created_at).format('DD/MM/YYYY')}
											</TableRowColumn>
											<TableRowColumn className={styles.colCharge}>
												<div className={styles[status.className]}>
													{abbreviateNumber(Number(finance.movements), 2)}$
													<FontAwesomeIcon icon={status.icon} />
												</div>
											</TableRowColumn>
										</TableRow>
									);
								})}
							</TableBody>
						</Table>
					)}
				</div>
			</div>
		);
	}
}

Finances.propTypes = {
	finances: array.isRequired,
	fetchFinances: func.isRequired,
	loading: bool.isRequired,
};

const mapStateToProps = state => ({
	finances: partition(state.user.finances, 9),
	loading: getRequestStatus('myFinances')(state).status === PROCESSING,
});

export default connect(
	mapStateToProps,
	{ fetchFinances: fetchFinancesAction },
)(Finances);
