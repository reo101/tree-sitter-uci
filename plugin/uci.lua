local ok, parsers = pcall(require, "nvim-treesitter.parsers")
if ok then
  if not parsers.uci then
    parsers.uci = {
      install_info = {
        url = "https://github.com/reo101/tree-sitter-uci",
        files = { },
        branch = "master",
      },
      filetype = "uci",
    }
  end
end
