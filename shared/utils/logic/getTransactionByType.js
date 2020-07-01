const TYPES = {
    VICTORIA: 'Victoria',
    DERROTA: 'Derrota',
    EMPATE: 'Empate',
    STADIUM: 'Stadium',
    MARKET: 'Market',
    GAME: 'Game'
}

const getMessage = (type, client) => {
    switch(type) {
        case TYPES.VICTORIA:
        case TYPES.DERROTA:
        case TYPES.EMPATE:
            return `Ingreso del estadio por partido (${type.toLowerCase()})`;
        case TYPES.STADIUM:
            return 'Ampliacion del estadio';
        case TYPES.MARKET:
            return `Intercambio en el mercado de fichajes ${client ? `con el ${client}` : ''}`;
        case TYPES.GAME:
            return 'Partido jugado';
        default:
            return '';
    }
}
const getStyle = (type) => {
    switch(type) {
        case TYPES.VICTORIA:
        case TYPES.DERROTA:
        case TYPES.EMPATE:
        case TYPES.STADIUM:
            return { className: 'stadium', icon: 'building'}
        case TYPES.MARKET:
            return { className: 'sign', icon: 'exchange-alt' }
        case TYPES.GAME:
            return { className: 'game', icon: 'futbol' };
        default:
            return { className: null, icon: null };
    }
};
export default (transaction) => {
    const { className, icon } = getStyle(transaction.type);
    const status = Number(transaction.movements) > 0 ?
        { className: 'win', icon: 'caret-up' } :
        { className: 'lose', icon: 'caret-down' };
    const message = getMessage(transaction.type, transaction.client);
    return {
        className,
        icon,
        status,
        message,
    };
};
