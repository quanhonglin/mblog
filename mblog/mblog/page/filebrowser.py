FILEBROWSER_DIRECTORY = 'uploads/'
FILEBROWSER_VERSIONS_BASEDIR = 'thumbnails/'

FILEBROWSER_ADMIN_VERSIONS = ['thumbnail', 'small', 'medium', 'big',]
FILEBROWSER_VERSIONS = {
    'admin_thumbnail': {'verbose_name': 'Admin Thumbnail', 'width': 60, 'height': 60, 'opts': 'crop'},
    'thumbnail': {'verbose_name': '100x100', 'width': 100, 'height': 100, 'opts': 'crop'},
    'small': {'verbose_name': 'Small(140)', 'width': 140, 'height': '', 'opts': ''},
    'medium': {'verbose_name': 'Medium(320)', 'width': 320, 'height': '', 'opts': ''},
    'big': {'verbose_name': 'Big(460)', 'width': 460, 'height': '', 'opts': ''},
}
