;; Tree-sitter highlights for UCI (Unified Configuration Interface) language

;; Highlight UCI keywords (commands)
(package_keyword) @keyword
(config_keyword) @keyword
(option_keyword) @keyword
(list_keyword) @keyword

;; Highlight package name as identifier
(package_statement (identifier) @identifier)
(package_statement (string) @identifier)

;; Highlight section types and names as identifiers
(config_section section_type: (identifier) @identifier)
(config_section section_type: (string) @identifier)
(config_section section_name: (identifier) @identifier)
(config_section section_name: (string) @identifier)

;; Highlight option and list names (keys) as identifiers
(option_statement name: (identifier) @identifier)
(option_statement name: (string) @identifier)
(list_statement name: (identifier) @identifier)
(list_statement name: (string) @identifier)

;; Highlight option and list values as strings
(option_statement value: (string) @string)
(option_statement value: (unquoted_value) @string)
(list_statement value: (string) @string)
(list_statement value: (unquoted_value) @string)

;; Highlight comments
(comment) @comment
