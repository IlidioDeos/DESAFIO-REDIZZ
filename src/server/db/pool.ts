import mysql from 'mysql';
import config from '../config';

const pool = mysql.createPool(config.db);

export const Query = <T = mysql.OkPacket>(sql: string, values?: any) => {
	return new Promise<T>((resolve, reject) => {

        const formatted = mysql.format(sql, values);

		pool.query(formatted, (err, results) => {
			if (err) {
				return reject(err);
			}

			return resolve(results);
		});
	});
};