CREATE TABLE user_logs (

    id SERIAL PRIMARY KEY,

    timestamp TIMESTAMP NOT NULL,

    method VARCHAR(20),

    path TEXT,

    status INTEGER,

    duration VARCHAR(50),

    user_agent TEXT,

    ip TEXT,

    owner TEXT,

    system_info JSONB
);