gem "zurb-foundation", "=3.2.5"
require "zurb-foundation"
# Require any additional compass plugins here.


# Set this to the root of your project when deployed:
http_path = "/"
css_dir = "app/styles"
# additional_import_paths = ["vendor/h5bp/css"]
sass_dir = "app/sass"
images_dir = "images"
javascripts_dir = "vendor/foundation"

# You can select your preferred output style here (can be overridden via the command line):
# output_style = :expanded or :nested or :compact or :compressed

# To enable relative paths to assets via compass helper functions. Uncomment:
# relative_assets = true

# To disable debugging comments that display the original location of your selectors. Uncomment:
# line_comments = false

# sass_options = { :sourcemap => true, :debug_info => true }

# If you prefer the indented syntax, you might want to regenerate this
# project again passing --syntax sass, or you can uncomment this:
# preferred_syntax = :sass
# and then run:
# sass-convert -R --from scss --to sass sass scss && rm -rf sass && mv scss sass

# move from ln-dev to wp
#theme_name = "sometheme"
#wp_rel_path = "/../wp-content/themes/"+theme_name+"/"
#require 'fileutils'
#if File.directory?(wp_rel_path)
#  on_stylesheet_saved do |file|
#    if File.exists?(file) && File.basename(file) == "style.css"
#      puts "Moving: #{file}"
#      FileUtils.mv(file, File.dirname(file) + wp_rel_path + File.basename(file))
#    end
#  end
#end