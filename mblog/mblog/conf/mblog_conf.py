# Database
# https://docs.djangoproject.com/en/1.8/ref/settings/#databases

DB_MYSQL = {
    'ENGINE': 'django.db.backends.mysql',
    'NAME': 'mblog',
    'USER': 'root',
    'PASSWORD': 'root',
    'HOST': 'localhost',
    'PORT': '3306',
}

DATABASES = {
    'default': DB_MYSQL,
}