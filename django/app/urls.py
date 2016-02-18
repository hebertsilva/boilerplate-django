from os import path as os_path
from django.conf import settings
from django.conf.urls import patterns, include, url
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.contrib import admin
from django.views.generic import TemplateView

admin.autodiscover()


urlpatterns = patterns(
    '',  # commom prefix to views

    url(r'^admin/', include(admin.site.urls)),

    # project apps urls
    url(r'^', include('appsite.urls')),

    # shortcut - error pages
    url(r'^404/$', TemplateView.as_view(template_name='404.html')),
    url(r'^500/$', TemplateView.as_view(template_name='404.html')),
)

if settings.DEBUG:
    urlpatterns += patterns(
        '',
        (r'^media/(.*)$', 'django.views.static.serve', {'document_root': os_path.join(settings.PROJECT_PATH, 'media')}),
    )
    urlpatterns += staticfiles_urlpatterns()
