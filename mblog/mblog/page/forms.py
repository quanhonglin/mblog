# coding=utf-8
from django import forms
from models import *

class EntryForm(forms.ModelForm):
    class Meta:
        model = Entry
        fields = '__all__'