/*
    PRICES PER UNIT:  
        terraces: 70
        tribunes: 150
        vip: 300
        fastfoods: 450.000
        shops: 700.000
        
    BEST STADIUM ( 200000, 20000, 6000, 30, 6 ):
        6.300.000
        7.200.000
        900.000
        6.750.000
        2.100.000
*/

const A = 259800;
const B = 170000;
const C = 60000;

export default ({ terraces, tribunes, vip, fastfoods, shops }) => {
	let rank = 0;
	rank += terraces * 0.5;
	rank += tribunes * 1;
	if (vip > 0) rank += vip * 1.8;
	if (fastfoods > 0) rank += fastfoods * 3000;
	if (shops > 0) rank += shops * 6000;

	if (rank >= A) return 'A';
	else if (rank >= B) return 'B';
	else if (rank >= C) return 'C';
	return 'D';
};
