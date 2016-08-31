from django.shortcuts import render,render_to_response
from django.template import RequestContext

def index(request):
    context = RequestContext(request)
    return render_to_response('django.html', context_instance=context)