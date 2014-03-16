/* globals module */
module.exports = function(grunt) {
	'use strict';

	grunt.initConfig({
		jshint: {
			options: {
				jshintrc: '.jshintrc'
			},
			all: [
				'public/assets/js/src/*.js',
				'admin/assets/js/src/*.js'
			]
		},
		{% if ('sass' === css_type) { %}
			sass: {
				development: {
					options: {
						style: 'expanded'
					},
					files: {
						'admin/assets/css/admin.dev.css' : 'admin/assets/css/sass/admin.scss',
						'public/assets/css/public.dev.css' : 'public/assets/css/asss/public.scss'
					}
				},
				production: {
					options: {
						style: 'compressed'
					},
					files: {
						'admin/assets/css/admin.dev.css' : 'admin/assets/css/sass/admin.scss',
						'public/assets/css/public.dev.css' : 'public/assets/css/asss/public.scss'
					}
				}
			}
		{% } else if ('less' === css_type) { %}
			less: {
				development: {
					files: {
						'admin/assets/css/admin.dev.css' : 'admin/assets/css/less/admin.less',
						'public/assets/css/public.dev.css' : 'public/assets/css/less/public.less'
					}
				},
				production: {
					options: {
						cleancss: true
					},
					files: {
						'admin/assets/css/admin.min.css' : 'admin/assets/css/admin.dev.css',
							'public/assets/css/public.min.css' : 'public/assets/css/public.dev.css'
					}
				}
			},
		{% } %}

		uglify: {
			development: {
				options: {
					mangle: false,
					compress: false,
					beautify: true
				},
				files: {
					'admin/assets/js/admin.dev.js': [
						'admin/assets/js/src/admin.js'
					],
					'public/assets/js/public.dev.js': [
						'public/assets/js/src/public.js'
					]
				}
			},
			production: {
				options: {
					compress: {
						global_defs: {
							'DEBUG': false
						},
						dead_code: true,
						drop_console: true
					}
				},
				files: {
					'admin/assets/js/admin.min.js': [
						'admin/assets/js/admin.dev.js'
					],
					'public/assets/js/public.min.js': [
						'public/assets/js/public.dev.js'
					]
				}
			}
		},

		watch: {
			{% if ('sass' === css_type) { %}
				sass: {
					files: [
						'admin/assets/css/sass/admin.scss',
						'public/assets/css/sass/public.scss'
					],
					tasks: ['sass:development'],
					options: {
						spawn: false
					}
				},
			{% } else if ('less' === css_type) { %}
				less: {
					files: [
						'admin/assets/css/less/admin.less',
						'public/assets/css/less/public.less'
					],
					tasks: ['less:development'],
					options: {
						spawn: false
					}
				},
			{% } %}

			js: {
				files: [
					'admin/assets/js/src/*.js',
					'public/assets/js/src/*.js'
				],
				tasks: ['jshint', 'uglify:development'],
				options: {
					spawn: false
				}
			}
		},
		clean: {
			dist: [
				'admin/assets/css/admin.min.css',
				'admin/assets/js/admin.min.js',
				'public/assets/css/public.min.css',
				'public/assets/js/public.min.js'
			]
		}
	});

	// Load tasks
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	{% if ('sass' === css_type) { %}
	grunt.loadNpmTasks('grunt-contrib-sass');
	{% } else if ('less' === css_type) { %}
	grunt.loadNpmTasks('grunt-contrib-less');
	{% } %}

	// Register tasks
	grunt.registerTask('default', [
		'jshint',
		'clean',
		'uglify',
		{% if ('sass' === css_type) { %}
		'sass'
		{% } else if ('less' === css_type) { %}
		'less'
		{% } %}
	]);

	grunt.registerTask('prod', [
		'jshint',
		'clean',
		'uglify:production',
		{% if ('sass' === css_type) { %}
		'sass:production'
		{% } else if ('less' === css_type) { %}
		'less:production'
		{% } %}
	]);

	grunt.registerTask('dev', [
		'watch'
	]);

};