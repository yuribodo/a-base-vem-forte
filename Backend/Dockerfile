# Usa uma imagem oficial do Python
FROM python:3.10

# Define o diretório de trabalho no container
WORKDIR /src

# Instala dependências do sistema necessárias para compilar psycopg2 e outras bibliotecas
# Copia os arquivos necessários para o container
COPY src/requirements.txt .

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Copia o restante do código-fonte
COPY src ./src

# Expõe a porta em que a aplicação Django será executada
EXPOSE 8000

# Comando padrão para iniciar o servidor Django
CMD ["python", "src/manage.py", "runserver", "0.0.0.0:8000"]
