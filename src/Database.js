import SQLite from 'react-native-sqlite-2';

export const db = SQLite.openDatabase('offlineData.db');

const createProductTable = () => {
  db.transaction(tx => {
    tx.executeSql(
      'CREATE TABLE IF NOT EXISTS productTable (id INTEGER PRIMARY KEY , name TEXT, image TEXT, price INTEGER, details TEXT, category TEXT)',
      [],
      () => console.log('Product table created successfully'),
      error => console.error('Error creating product table:', error),
    );
  });
};

export {createProductTable};
