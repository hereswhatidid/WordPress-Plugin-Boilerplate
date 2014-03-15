/**
 * grunt-wp-pbp
 * https://github.com/hereswhatidid/grunt-wp-pbp
 *
 * Copyright (c) 2013 Gabe Shackle
 * Licensed under the MIT License
 */

'use strict';

// Basic template description
exports.description = 'Create a WordPress plugin.';

// Template-specific notes to be displayed before question prompts.
exports.notes = '';

// Template-specific notes to be displayed after the question prompts.
exports.after = '';

// Any existing file or directory matching this wildcard will cause a warning.
exports.warnOn = '*';

// The actual init template
exports.template = function( grunt, init, done ) {
	init.process( {}, [
		// Prompt for these values.
		init.prompt( 'title', 'WP Plugin' ),
		{
			name   : 'package_name',
			message: 'PHP Package Name (alpha and underscore characters only)',
			default: 'Plugin_Name'
		},
		init.prompt( 'description', 'A custom WordPress plugin.' ),
		init.prompt( 'version', '1.0.0' ),
		{
			name   : 'slug',
			message: 'Language Slug: (alpha and underscore characters only)',
			default: 'plugin-name'
		},
		init.prompt( 'homepage', 'http://wordpress.org/plugins' ),
		init.prompt( 'author_name', 'Gabe Shackle' ),
		init.prompt( 'author_email', 'gabe.shackle@gmail.com' ),
		init.prompt( 'author_url', 'http://hereswhatidid.com/' ),
		{
			name: 'useajax',
			message: 'Does this plugin utilize AJAX within WordPress? (y / n)',
			default: 'n'
		},
		{
			name: 'css_type',
			message: 'CSS Preprocessor: Will you use "Sass", "LESS", or "none" for CSS with this project?',
			default: 'Sass'
		},
		{
			name: 'menutext',
			message: 'Settings Menu Title',
			default: 'Menu Text'
		}
	], function( err, props ) {
		props.keywords = [];
		props.version = '0.1.0';
		props.devDependencies = {
			'grunt': '~0.4.2',
			'grunt-contrib-uglify':   '~0.4.0',
			'grunt-contrib-cssmin':   '~0.9.0',
			'grunt-contrib-jshint':   '~0.8.0',
			'grunt-contrib-watch':    '~0.5.3',
			'grunt-contrib-clean':    '~0.5.0'
		};

		// Sanitize names where we need to for PHP/JS
		props.name = props.title.replace( /\s+/g, '-' ).toLowerCase();
		// Development prefix (i.e. to prefix PHP function names, variables)
		props.prefix = props.prefix.replace('/[^a-z_]/i', '').toLowerCase();
		// Development prefix in all caps (e.g. for constants)
		props.prefix_caps = props.prefix.toUpperCase();
		// An additional value, safe to use as a JavaScript identifier.
		props.js_safe_name = props.name.replace(/[\W_]+/g, '_').replace(/^(\d)/, '_$1');
		// An additional value that won't conflict with NodeUnit unit tests.
		props.js_test_safe_name = props.js_safe_name === 'test' ? 'myTest' : props.js_safe_name;
		props.js_safe_name_caps = props.js_safe_name.toUpperCase();

		// Files to copy and process
		var files = init.filesToCopy( props );

		switch( props.css_type.toLowerCase()[0] ) {
			case 'l':
				delete files[ 'admin/assets/css/sass/' + props.js_safe_name + '.scss'];
				delete files[ 'admin/assets/css/src/' + props.js_safe_name + '.css' ];

				props.devDependencies["grunt-contrib-less"] = "~0.9.0";
				props.css_type = 'less';
				break;
			case 'n':
			case undefined:
				delete files[ 'admin/assets/css/less/' + props.js_safe_name + '.less'];
				delete files[ 'admin/assets/css/sass/' + props.js_safe_name + '.scss'];

				props.css_type = 'none';
				break;
			// SASS is the default
			default:
				delete files[ 'admin/assets/css/less/' + props.js_safe_name + '.less'];
				delete files[ 'admin/assets/css/src/' + props.js_safe_name + '.css' ];

				props.devDependencies["grunt-contrib-sass"] = "~0.7.2";
				props.css_type = 'sass';
				break;
		}

		console.log( files );

		// Actually copy and process files
		init.copyAndProcess( files, props );

		// Generate package.json file
		init.writePackageJSON( 'package.json', props );

		// Done!
		done();
	});
};