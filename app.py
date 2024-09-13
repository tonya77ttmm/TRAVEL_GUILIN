from flask import Flask, request
from flask_cors import CORS
import sqlite3
import logging

app = Flask(__name__)
CORS(app)  # Allow all origins

logging.basicConfig(level=logging.DEBUG)

def init_db():
    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('''
            CREATE TABLE IF NOT EXISTS tables (
                id TEXT PRIMARY KEY,
                data TEXT
            )
        ''')
        conn.commit()

@app.route('/save_table', methods=['POST'])
def save_table():
    table_id = request.form.get('tableId')
    table_data = request.form.get('tableData')

    logging.debug(f"Received table ID: {table_id}")
    logging.debug(f"Received table data: {table_data}")

    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('REPLACE INTO tables (id, data) VALUES (?, ?)', (table_id, table_data))
        conn.commit()
        logging.debug("Table data saved successfully")

    return 'Data saved successfully', 200

@app.route('/load_table', methods=['GET'])
def load_table():
    table_id = request.args.get('tableId')
    logging.debug(f"Requested table ID: {table_id}")

    with sqlite3.connect('database.db') as conn:
        cursor = conn.cursor()
        cursor.execute('SELECT data FROM tables WHERE id = ?', (table_id,))
        row = cursor.fetchone()
        if row:
            logging.debug(f"Loaded data: {row[0]}")
            return row[0], 200
        else:
            logging.debug("No data found")
            return '', 404

if __name__ == '__main__':
    init_db()  # Ensure the database is initialized
    app.run(port=5000, debug=True)
