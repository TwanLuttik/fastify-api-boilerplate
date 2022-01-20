require('dotenv').config({
	path: `./.env${process.env.NODE_ENV === 'production' ? '.prod' : ''}`,
});

export const env = {
	SOMEKEY: process.env.SOMEKEY,
	IS_PRODUCTION: process.env.NODE_ENV === 'production',
};
