import urlparse
from s3_folder_storage.s3 import DefaultStorage, StaticStorage
from django.conf import settings
from django.core.files.storage import get_storage_class
from storages.backends.s3boto import S3BotoStorage


MediaS3BotoStorage = lambda: S3BotoStorage(location='media')
StaticS3BotoStorage = lambda: S3BotoStorage(location='static')


def domain(url):
    return urlparse.urlparse(url).hostname


class MediaFilesStorage(DefaultStorage):
    def __init__(self, *args, **kwargs):
        kwargs['bucket'] = settings.AWS_STORAGE_BUCKET_NAME
        kwargs['custom_domain'] = domain(settings.MEDIA_URL)
        super(MediaFilesStorage, self).__init__(*args, **kwargs)


class StaticFilesStorage(StaticStorage):
    def __init__(self, *args, **kwargs):
        kwargs['bucket'] = settings.AWS_STORAGE_BUCKET_NAME
        kwargs['custom_domain'] = domain(settings.STATIC_URL)
        super(StaticFilesStorage, self).__init__(*args, **kwargs)


class CachedS3BotoStorage(S3BotoStorage):
    """
    S3 storage backend that saves the files locally, too.
    """
    def __init__(self, *args, **kwargs):
        super(CachedS3BotoStorage, self).__init__(*args, **kwargs)
        self.local_storage = get_storage_class(
            "compressor.storage.CompressorFileStorage")()

    def save(self, name, content):
        name = super(CachedS3BotoStorage, self).save(name, content)
        self.local_storage._save(name, content)
        return name
