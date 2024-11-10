from flask import Flask, request, jsonify
from flask_cors import CORS
from werkzeug.security import generate_password_hash
import sqlite3

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}}, supports_credentials=True)  # allow all origins for all routes as it was giving me errors when signing up

# Database connection
def connect_db():
    return sqlite3.connect('task_force.db')

# Ensure the users table exists with `email` instead of `username`
def create_users_table():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            user_id INTEGER PRIMARY KEY AUTOINCREMENT,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL
        )
    ''')
    conn.commit()
    conn.close()

# Call create_users_table to ensure the users table exists
create_users_table()

# Sign up route with `email` field instead of `username`
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    hashed_password = generate_password_hash(password)  # Hash the password

    conn = connect_db()
    cursor = conn.cursor()
    try:
        cursor.execute('INSERT INTO users (email, password) VALUES (?, ?)', (email, hashed_password))
        conn.commit()
        return jsonify({'success': True, 'message': 'User registered successfully!'})
    except sqlite3.IntegrityError:
        return jsonify({'success': False, 'message': 'Email already exists. Please use another.'})
    finally:
        conn.close()

# 1. Adds any task
@app.route('/tasks', methods=['POST'])
def add_task():
    data = request.get_json()
    title = data['title']
    description = data.get('description', '')
    priority = data.get('priority', 'normal')
    due_date = data.get('due_date', None)
    status = data.get('status', 'pending')

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        INSERT INTO tasks (title, description, priority, due_date, status)
        VALUES (?, ?, ?, ?, ?)
    ''', (title, description, priority, due_date, status))
    conn.commit()
    task_id = cursor.lastrowid
    conn.close()

    return jsonify({'message': 'Task added successfully!', 'task_id': task_id}), 201

# 2. Views any task
@app.route('/tasks', methods=['GET'])
def get_tasks():
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM tasks')
    tasks = cursor.fetchall()
    conn.close()

    task_list = []
    for task in tasks:
        task_list.append({
            'task_id': task[0],
            'title': task[1],
            'description': task[2],
            'priority': task[3],
            'due_date': task[4],
            'status': task[5]
        })

    return jsonify(task_list)

# 3. Updates any task
@app.route('/tasks/<int:task_id>', methods=['PUT'])
def update_task(task_id):
    data = request.get_json()
    title = data.get('title')
    description = data.get('description')
    priority = data.get('priority')
    due_date = data.get('due_date')
    status = data.get('status')

    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('''
        UPDATE tasks
        SET title = ?, description = ?, priority = ?, due_date = ?, status = ?
        WHERE task_id = ?
    ''', (title, description, priority, due_date, status, task_id))
    conn.commit()
    conn.close()

    return jsonify({'message': 'Task updated successfully!'})

# 4. Deletes any task
@app.route('/tasks/<int:task_id>', methods=['DELETE'])
def delete_task(task_id):
    conn = connect_db()
    cursor = conn.cursor()
    cursor.execute('DELETE FROM tasks WHERE task_id = ?', (task_id,))
    conn.commit()
    conn.close()

    response = jsonify({'message': 'Task deleted successfully!'})
    response.headers.add("Access-Control-Allow-Origin", "*")
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, DELETE, PUT, OPTIONS")
    return response

    return jsonify({'message': 'Task deleted successfully!'})

if __name__ == '__main__':
    app.run(debug=True)