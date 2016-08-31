__author__ = 'quanhonglin'

from django.conf.urls import include, url
from .views import *

urlpatterns = [
            url(r'^$', index, name="index"),
            url(r'^blog/', blog, name="blog"),
            url(r'^(?P<eid>\d+)/$', article, name='page.get'),

    ]
