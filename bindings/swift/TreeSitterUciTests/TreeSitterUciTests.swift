import XCTest
import SwiftTreeSitter
import TreeSitterUci

final class TreeSitterUciTests: XCTestCase {
    func testCanLoadGrammar() throws {
        let parser = Parser()
        let language = Language(language: tree_sitter_uci())
        XCTAssertNoThrow(try parser.setLanguage(language),
                         "Error loading Unified Configuration Interface grammar")
    }
}
