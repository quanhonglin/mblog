# coding=utf-8
from django.contrib import admin
from models import *
from forms import *

class EntryInline(admin.StackedInline):
    model = Entry
    form = EntryForm

class CategoryAdmin(admin.ModelAdmin):
    inlines = [EntryInline]

class EntryAdmin(admin.ModelAdmin):
    form = EntryForm
    fields = ('title', 'category', 'tags', 'public', 'in_top', 'content',)
    list_display = ('title', 'created', 'modified', 'public', 'author', 'category')
    list_filter = ('created', 'modified', 'public', 'category')
    search_fields = ('title', 'content')
    date_hierarchy = 'created'
    change_list_template = 'admin/change_list.html'

    class Media:
        js = ('ckeditor/ckeditor.js',
              'ckeditor/config.js',
              'js/ckeditor-setup.js',
             )

    def tag_list(self, obj):
        return u", ".join(o.name for o in obj.tags.all())

    def save_model(self, request, obj, form, change):
        '''通过admin界面添加文章时, 自动把作者设为当前用户'''
        if not change:
            obj.author = request.user
        obj.save()

    def make_publish(self, request, queryset):
        queryset.update(public=True)
    make_publish.short_description = u'开放所选文章'

    def make_private(self, request, queryset):
        queryset.update(public=False)
    make_private.short_description = u'取消开放所选文章'

admin.site.register(Entry, EntryAdmin)
admin.site.register(Category, CategoryAdmin)