import sqlite3

# Creates the database
conn = sqlite3.connect('task_force.db')
cursor = conn.cursor()

# Creates the Tasks table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS tasks (
        task_id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT,
        priority TEXT DEFAULT 'normal',
        due_date TEXT,
        status TEXT DEFAULT 'pending'
    )
''')

# Creates the Users table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS users (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL
    )
''')

# Creates the Categories table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS categories (
        category_id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT UNIQUE NOT NULL
    )
''')

# Creates the Task_Comments table
cursor.execute('''
    CREATE TABLE IF NOT EXISTS task_comments (
        comment_id INTEGER PRIMARY KEY AUTOINCREMENT,
        task_id INTEGER,
        comment_text TEXT NOT NULL,
        created_at TEXT DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (task_id) REFERENCES tasks (task_id)
    )
''')

# Commits the code and closes the connection
conn.commit()
conn.close()

print("Database and tables created successfully.")
