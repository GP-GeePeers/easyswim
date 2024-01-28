# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
import os
import sys
import django

sys.path.insert(0, os.path.abspath('../..'))
print(sys.path)

# -- Project information -----------------------------------------------------

project = 'EasySwim'
copyright = '2023, GeePeers'
author = 'GeePeers'


# -- General configuration ---------------------------------------------------

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = ['sphinx.ext.autodoc', 'sphinx.ext.coverage', 'sphinx.ext.napoleon',
'sphinxawesome_theme.highlighting','sphinxmermaid']


# Add any paths that contain templates here, relative to this directory.
templates_path = ['templates']

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = []


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_logo = "logo.png"
html_permalinks_icon = '<span>#</span>'

html_theme = 'sphinxawesome_theme'



html_theme_options = {
   # Add your theme options. For example:
   "show_breadcrumbs": True,
   "show_scrolltop": True,
  'extra_header_link_icons': {
      
         'Swagger': {
             'icon': '<svg height="26" width="26" viewBox="0 0 510 510" xmlns="http://www.w3.org/2000/svg"><path  fill="currentColor" d="m127.7110825 34.4531364c-170.2814789 98.1692047-170.2814026 344.9245911 0 443.0937195s384.2889175-25.208477 384.2889175-221.5468254-214.0075073-319.7160339-384.2889175-221.5468941zm48.6630477 374.1001168c-122.139801 0-19.929306-137.3335266-104.7761612-134.9657288v-36.7011261c80.0386734 9.9306183-15.3906517-146.2125549 104.1839828-132.5976257v28.4137802c-66.6934204 1.5785828-.3946075 86.8199158-60.3792725 122.5344086 60.3792725 39.6608887-3.1571045 130.0325317 60.9714508 120.1665955v33.1496963zm-4.2858123-133.4223328c-13.7811279-7.9449768-13.7811279-27.9151764 0-35.8600769 13.7810516-7.9449921 31.1009064 2.0401154 31.1009064 17.9299927s-17.3198548 25.875-31.1009064 17.9300842zm73.5291443 0c-13.7810669-7.9449768-13.7810669-27.9151764 0-35.8600769 13.7810669-7.9449921 31.1008911 2.0401154 31.1008911 17.9299927s-17.3198242 25.875-31.1008911 17.9300842zm73.5291442 0c-13.7810669-7.9449768-13.7810669-27.9151764 0-35.8600769 13.7810669-7.9449921 31.1009827 2.0401154 31.1009827 17.9299927s-17.3199158 25.875-31.1009827 17.9300842zm16.4793091 133.4223328v-33.1496887c64.1285706 9.8659363.5921631-80.5057068 60.9714355-120.1665955-59.9846497-35.7144928 6.3141479-120.9558258-60.3792725-122.5344086v-28.4137802c119.574646-13.6149292 24.1453247 142.5282288 104.1839905 132.5976257v36.7011261c-84.8468627-2.3678054 17.3636476 134.9657212-104.7761535 134.9657212z"/></svg>'
            ,'link': 'https://easyswim.online/backend/docs/',
        },

       'GitHub': {
            'icon': '<svg fill="currentColor" height="26px" style="margin-top:-2px;display:inline" viewBox="0 0 45 44" xmlns="http://www.w3.org/2000/svg"><path clip-rule="evenodd" d="M22.477.927C10.485.927.76 10.65.76 22.647c0 9.596 6.223 17.736 14.853 20.608 1.087.2 1.483-.47 1.483-1.047 0-.516-.019-1.881-.03-3.693-6.04 1.312-7.315-2.912-7.315-2.912-.988-2.51-2.412-3.178-2.412-3.178-1.972-1.346.149-1.32.149-1.32 2.18.154 3.327 2.24 3.327 2.24 1.937 3.318 5.084 2.36 6.321 1.803.197-1.403.759-2.36 1.379-2.903-4.823-.548-9.894-2.412-9.894-10.734 0-2.37.847-4.31 2.236-5.828-.224-.55-.969-2.759.214-5.748 0 0 1.822-.584 5.972 2.226 1.732-.482 3.59-.722 5.437-.732 1.845.01 3.703.25 5.437.732 4.147-2.81 5.967-2.226 5.967-2.226 1.185 2.99.44 5.198.217 5.748 1.392 1.517 2.232 3.457 2.232 5.828 0 8.344-5.078 10.18-9.916 10.717.779.67 1.474 1.996 1.474 4.021 0 2.904-.027 5.247-.027 5.96 0 .58.392 1.256 1.493 1.044C37.981 40.375 44.2 32.24 44.2 22.647c0-11.996-9.726-21.72-21.722-21.72" fill="currentColor" fill-rule="evenodd"></path></svg>',  # Font Awesome GitHub icon
            'link': 'https://github.com/GP-GeePeers/easyswim',
        },
     
                              },
   "main_nav_links": {
      "": "",
   }


}


# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']
sphinxmermaid_mermaid_init = {
  'theme': 'dark',
  'themeVariables': {

    'lineColor': '#F8B229',

  }
}

os.environ['DJANGO_SETTINGS_MODULE'] = 'easyswim.settings'  # Adjust the settings module name
django.setup()