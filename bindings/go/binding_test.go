package tree_sitter_uci_test

import (
	"testing"

	tree_sitter "github.com/tree-sitter/go-tree-sitter"
	tree_sitter_uci "github.com/reo101/tree-sitter-uci/bindings/go"
)

func TestCanLoadGrammar(t *testing.T) {
	language := tree_sitter.NewLanguage(tree_sitter_uci.Language())
	if language == nil {
		t.Errorf("Error loading Unified Configuration Interface grammar")
	}
}
