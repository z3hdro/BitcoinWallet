# BitcoinWallet
прототип bitcoin-кошелька в виде SPA
Для установки необходимо и использования необходимо иметь установленный docker, python, node.js, npm, venv
Обязательно выполнить действия сначала для Backend-инструкции, а затем для Frontend.

# Backend

## Установка

1. Клонируем данный репозиторий на устройство:
  ### `git clone https://github.com/z3hdro/API_request.git`

2. Переходим в backend-часть проекта (cd BitcoinWallet\backend) и устанавливаем виртуальное окружение:

Для macOS and Linux:
### `python3 -m venv env`

Для Windows
### ` python -m venv env`

3. Активируем виртуальное окружение

Для macOS and Linux:
### `source env/bin/activate`

Для Windows
### `.\env\Scripts\activate`

4. Переходим в корень проекта (cd api) и устанавливаем все зависимости из requirements.txt:
### `pip install -r requirements.txt`
   
5. Далее, необходимо запустить docker и запустить контейнеры postgresql:
## PostgreSQL
### `docker run --name {container name} -p {preferable port postgresql}:5432 -v {path to store data}:/var/lib/postgresql/data -e POSTGRES_PASSWORD={preferable password} postgres`

6. Открываем database.py и записываем необходмые настройки:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:{preferable password}@localhost:{preferable port postgresql}/postgres"
```

7. Для инициализации Alembic выполним:
### `alembic init migrations` 

Далее открываем alembic.ini и вносим необходмые настройки:

sqlalchemy.url = {значение SQLALCHEMY_DATABASE_URL из database.py без ""} 

```python
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:{preferable password}@localhost:{preferable port postgresql}/postgres"
```
8. Далее нужно сгенерировать миграции и обновить БД:
### `alembic revision --autogenerate -m "Added required tables"`
### `alembic upgrade head"`

9. Запускаем из папки ..\BitcoinWallet\backend\wallet-backend сам проект:
  ### `uvicorn main:app --reload`
  
# Frontend

## Установка

1. Заходим в ..\BitcoinWallet\frontend\wallet-frontend из терминала и запускаем:
  ### `npm install`

2. После установки node_modules, проект готов к запуску:

### `npm start`

