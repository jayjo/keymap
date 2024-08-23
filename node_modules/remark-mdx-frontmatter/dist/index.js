"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remarkMdxFrontmatter = void 0;
const estree_util_is_identifier_name_1 = require("estree-util-is-identifier-name");
const estree_util_value_to_estree_1 = require("estree-util-value-to-estree");
const js_yaml_1 = require("js-yaml");
const toml_1 = require("toml");
/**
 * A remark plugin to expose frontmatter data as named exports.
 *
 * @param options - Optional options to configure the output.
 * @returns A unified transformer.
 */
const remarkMdxFrontmatter = ({ name } = {}) => (ast) => {
    const mdast = ast;
    const imports = [];
    if (name && !(0, estree_util_is_identifier_name_1.name)(name)) {
        throw new Error(`If name is specified, this should be a valid identifier name, got: ${JSON.stringify(name)}`);
    }
    for (const node of mdast.children) {
        let data;
        const { value } = node;
        if (node.type === 'yaml') {
            data = (0, js_yaml_1.load)(value);
            // @ts-expect-error A custom node type may be registered for TOML frontmatter data.
        }
        else if (node.type === 'toml') {
            data = (0, toml_1.parse)(value);
        }
        if (data == null) {
            continue;
        }
        if (!name && typeof data !== 'object') {
            throw new Error(`Expected frontmatter data to be an object, got:\n${value}`);
        }
        imports.push({
            type: 'mdxjsEsm',
            value: '',
            data: {
                estree: {
                    type: 'Program',
                    sourceType: 'module',
                    body: [
                        {
                            type: 'ExportNamedDeclaration',
                            source: null,
                            specifiers: [],
                            declaration: {
                                type: 'VariableDeclaration',
                                kind: 'const',
                                declarations: Object.entries(name ? { [name]: data } : data).map(([identifier, val]) => {
                                    if (!(0, estree_util_is_identifier_name_1.name)(identifier)) {
                                        throw new Error(`Frontmatter keys should be valid identifiers, got: ${JSON.stringify(identifier)}`);
                                    }
                                    return {
                                        type: 'VariableDeclarator',
                                        id: { type: 'Identifier', name: identifier },
                                        init: (0, estree_util_value_to_estree_1.valueToEstree)(val),
                                    };
                                }),
                            },
                        },
                    ],
                },
            },
        });
    }
    mdast.children.unshift(...imports);
};
exports.remarkMdxFrontmatter = remarkMdxFrontmatter;
