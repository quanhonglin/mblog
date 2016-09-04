#! /usr/bin/env python
# -*- coding: utf-8 -*-
from django.shortcuts import render, render_to_response, get_object_or_404
from models import *
import utils
from django.template import RequestContext
# Create your views here.
def index(request):
    context = RequestContext(request)
    return render_to_response('index.html', context_instance=context)

def blog(request):
    context = RequestContext(request)
    articles = Entry.objects.accessibles(request.user)
    categorys = Category.objects.values("name").distinct()
    header = Category.objects.values("nav_name").distinct()
    latest = Entry.objects.filter().order_by("created")[0:9]
    context['articles'] = articles
    context['categorys'] = categorys
    context['header'] = header
    context['latest'] = latest
    return render_to_response('blog.html', context_instance=context)

def entry(request, category):
    context = RequestContext(request)
    obj = Category.objects.filter(nav_name=category)
    category = obj[0]
    enties = Entry.objects.filter(category=category)
    context["enties"] = enties
    context["category"] = category
    return render_to_response('categorys.html', context_instance=context)

def article(request, eid):
    context = RequestContext(request)
    object = get_object_or_404(Entry, pk=eid)
    if object:
        articles = Entry.objects.filter(id=eid)
        context["object"] = object
        context["articles"] = articles
        context["eid"] = eid
    return render_to_response('article.html', context_instance=context)


def get(request, pid):
    if request.user.is_superuser:
        page = get_object_or_404(Entry, pk=pid)
    else:
        page = get_object_or_404(Entry, pk=pid, public=True)

    context = {
        'page': page,
    }
    return render_to_response('page/article.html', context,
                              context_instance=RequestContext(request))

def _base_context(request):
    #FIXME: cache the result
    return {
        'categories': Category.objects.all(),
        'tags': utils.tags_for('page.entry'),
    }
