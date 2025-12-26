local ok, parsers = pcall(require, "nvim-treesitter.parsers")
if ok then
  local parser_configs = parsers.get_parser_configs()
  if not parser_configs.uci then
    parser_configs.uci = {
      install_info = {
        url = "https://github.com/reo101/tree-sitter-uci",
        files = { },
        branch = "master",
      },
      filetype = "uci",
    }
  end
end
