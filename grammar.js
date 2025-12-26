// Tree-sitter grammar for OpenWrt UCI (/etc/config/*)
//
// Based on OpenWrt UCI syntax docs & existing syntax definitions (`vim`'s `vim-uci`, `nano`'s `uci.nanorc`).

module.exports = grammar({
  name: 'uci',

  // Whitespace (spaces, tabs, newlines) and comments to skip by default
  extras: $ => [
    /[ \t\r\n]+/, // whitespace (including newlines)
    $.comment     // treat comments as whitespace
  ],

  // No external scanner is used; all lexing is handled with regex patterns
  // externals: $ => [],
  // conflicts: $ => [],

  rules: {
    // The top-level structure of a UCI configuration file:
    source_file: $ => repeat(choice($.package_statement, $.config_section)),

    // UCI supports shell-style comments starting with '#'
    comment: $ => token(seq('#', /[^\n]*/)),

    // A "package" statement declares the configuration file's package name.
    // Syntax: package <name>
    package_statement: $ => seq(
      $.package_keyword,
      $.identifier_or_string
    ),

    // A "config" section definition. Syntax:
    // config <section_type> [<section_name>]
    // The section_type is required, section_name is optional (anonymous section if omitted).
    // This is followed by zero or more option/list statements (until the next section or EOF).
    config_section: $ => seq(
      $.config_keyword,
      $.identifier_or_string,           // section type
      optional($.identifier_or_string), // optional section name
      repeat(choice($.option_statement, $.list_statement))
    ),

    // An "option" statement defining a single value. Syntax: option <option_name> <value>
    option_statement: $ => seq(
      $.option_keyword,
      $.identifier_or_string, // option name
      $.value                 // option value
    ),

    // A "list" statement defining a multi-value option (can appear multiple times with same name).
    // Syntax: list <option_name> <value>
    list_statement: $ => seq(
      $.list_keyword,
      $.identifier_or_string, // option name (list name)
      $.value                 // one value entry for the list
    ),

    // Allow an identifier (unquoted word) or a quoted string for names (section names, option names, etc.)
    identifier_or_string: $ => choice($.identifier, $.string),

    // Value can be a quoted string or an unquoted value token.
    value: $ => choice($.string, $.unquoted_value),

    // Keywords tokens
    package_keyword: $ => 'package',
    config_keyword: $ => 'config',
    option_keyword: $ => 'option',
    list_keyword: $ => 'list',

    // Unquoted identifier (for section types, names, option names).
    // Allowed characters: letters, digits, underscore (as per UCI spec, identifiers are [a-z0-9_]+).
    identifier: $ => /[a-z0-9_]+/,

    // Unquoted value token (for option values that are not quoted).
    // This matches any sequence of non-whitespace characters not including quotes or #.
    // (If a value contains whitespace or begins with '#' or includes quotes, it should be quoted.)
    unquoted_value: $ => /[^#\s'"]+/,

    // Quoted string (single or double quotes), supporting escape sequences and multi-line content.
    // Strings can span multiple lines until a matching closing quote is found.
    // Inside strings, quotes can be escaped with backslashes, and backslash-newline is treated as a continuation.
    string: $ => choice(
      $.double_quoted_string,
      $.single_quoted_string
    ),
    double_quoted_string: $ => token(seq(
      '"',
      repeat(choice(
        /[^"\\\n]/, // any character except " or backslash or newline
        /\\./,      // escaped any char (e.g. ", \n, etc.)
        /\\\n/,     // line continuation (backslash followed by newline)
        /\n/        // newline (actual line break in string)
      )),
      '"'
    )),
    single_quoted_string: $ => token(seq(
      '\'',
      repeat(choice(
        /[^'\\\n]/, // any character except ' or backslash or newline
        /\\./,      // escaped any char (e.g. ', \n, etc.)
        /\\\n/,     // line continuation with backslash
        /\n/        // newline in string
      )),
      '\''
    ))
  }
});
