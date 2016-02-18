require 'bootstrap-sass'

static_dir = "../django/static/"

css_dir = static_dir +  "css/"
sass_dir = "source"
images_dir = static_dir + "img/"
javascripts_dir = static_dir + "js/"
fonts_dir = static_dir + "font/"
generated_images_dir = images_dir + "common/"

if environment == :production
	http_path = "https://xxxxxxxx.cloudfront.net/"
	output_style = :compressed
else
	http_path = "/"
	output_style = :expanded
    line_comments = false
    sourcemap = false
end

http_fonts_path = http_path + "static/font/"
http_images_path = http_path + "static/img/"
http_generated_images_path = http_path + "static/img/common"
