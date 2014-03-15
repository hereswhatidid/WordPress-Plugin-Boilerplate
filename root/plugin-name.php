<?php
/**
 * The WordPress Plugin Boilerplate.
 *
 * A foundation off of which to build well-documented WordPress plugins that
 * also follow WordPress Coding Standards and PHP best practices.
 *
 * @package   {%= package_name %}
 * @author    {%= author_name %} <{%= author_email }>
 * @license   GPL-2.0+
 * @link      http://example.com
 * @copyright 2014 {%= author_name %}
 *
 * @wordpress-plugin
 * Plugin Name: {%= title %}
 * Plugin URI:  {%= homepage %}
 * Description: {%= description %}
 * Version:     {%= version %}
 * Author:      {%= author_name %}
 * Author URI:  {%= author_url %}
 * License:     GPLv2+
 * Text Domain: {%= prefix %}
 * Domain Path: /languages
 * GitHub Plugin URI: https://github.com/<owner>/<repo>
 */

// If this file is called directly, abort.
if ( ! defined( 'WPINC' ) ) {
	die;
}

/*----------------------------------------------------------------------------*
 * Public-Facing Functionality
 *----------------------------------------------------------------------------*/

require_once( plugin_dir_path( __FILE__ ) . 'public/class-root.php' );

/*
 * Register hooks that are fired when the plugin is activated or deactivated.
 * When the plugin is deleted, the uninstall.php file is loaded.
 */
register_activation_hook( __FILE__, array( '{%= package_name %}', 'activate' ) );
register_deactivation_hook( __FILE__, array( '{%= package_name %}', 'deactivate' ) );

add_action( 'plugins_loaded', array( '{%= package_name %}', 'get_instance' ) );

/*----------------------------------------------------------------------------*
 * Dashboard and Administrative Functionality
 *----------------------------------------------------------------------------*/

{% if ('n' === useajax) { %}
if ( is_admin() && ( ! defined( 'DOING_AJAX' ) || ! DOING_AJAX ) ) {
{% } else { %}
if ( is_admin() ) {
{% } %}
	require_once( plugin_dir_path( __FILE__ ) . 'admin/class-{%= js_safe_name %}-admin.php' );
	add_action( 'plugins_loaded', array( '{%= package_name %}_Admin', 'get_instance' ) );

}
