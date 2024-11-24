# Usa a imagem oficial do Python como base
FROM python:3.11-slim

# Define o diretório de trabalho dentro do container
WORKDIR /src

# Copia os arquivos necessários para o container
COPY src/requirements.txt ./
COPY src ./src

# Instala as dependências do Python
RUN pip install --no-cache-dir -r requirements.txt

# Expõe a porta em que a aplicação Django será executada
EXPOSE 8000

# Comando para executar o servidor de desenvolvimento do Django
CMD ["python", "src/manage.py", "runserver", "0.0.0.0:8000"]
