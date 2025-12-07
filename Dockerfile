ОТ python:3.11-slim

РАБОТНА ДИРЕКТОРИЯ /приложение

КОПИРАНЕ requirements.txt /app/
ИЗПЪЛНЕТЕ pip install --no-cache-dir -r requirements.txt

КОПИЕ . /приложение/

CMD ["python", "bot.py"]
