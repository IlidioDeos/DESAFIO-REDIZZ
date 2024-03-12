import mysql from 'mysql2';
import config from '../config';

const pool = mysql.createPool(config.db);

// Alterado para retornar Promise<any> para evitar conflitos de tipo
export const Query = (sql: string, values?: any): Promise<any> => {
    return new Promise((resolve, reject) => {
        const formatted = mysql.format(sql, values);

        pool.query(formatted, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};