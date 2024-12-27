import psycopg2

DATABASE_URL = "postgresql://ecofood_db_user:aS4ed82Bbq3xBR7BEScjqr66nt6ANtH2@dpg-ctmt075ds78s73bvl9p0-a/ecofood_db?client_encoding=utf8"

try:
    conn = psycopg2.connect(DATABASE_URL)
    print("Conexão bem-sucedida!")
    conn.close()
except Exception as e:
    print(f"Erro na conexão: {e}")
