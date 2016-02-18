# coding: utf-8
from base import *

DEBUG = True


ADMINS = (
    ('_____', '_____@__________'),
)

MANAGERS = ADMINS


DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'repo_estudos.db',
        'USER': '',
        'PASSWORD': '',
        'HOST': '',
        'PORT': '',
    },
}


# EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
DEFAULT_FROM_EMAIL = 'seuemail@seuemail.com'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = 'seuemail@seuemail.com'
EMAIL_HOST_PASSWORD = '123456'
EMAIL_USE_TLS = True
EMAIL_HOST_PORT = 587

CACHE_BACKEND = 'dummy://'

# variáveis Compress
COMPRESS_ENABLED = False
