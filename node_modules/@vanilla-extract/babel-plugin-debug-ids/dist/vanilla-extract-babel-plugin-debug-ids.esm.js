import { types } from '@babel/core';

const packageIdentifiers = new Set(['@vanilla-extract/css', '@vanilla-extract/recipes']);
const debuggableFunctionConfig = {
  style: {
    maxParams: 2
  },
  createTheme: {
    maxParams: 3
  },
  styleVariants: {
    maxParams: 3,
    hasDebugId: ({
      arguments: args
    }) => {
      const previousArg = args[args.length - 1];
      return types.isStringLiteral(previousArg) || types.isTemplateLiteral(previousArg);
    }
  },
  fontFace: {
    maxParams: 2
  },
  keyframes: {
    maxParams: 2
  },
  createVar: {
    maxParams: 1
  },
  recipe: {
    maxParams: 2
  },
  createContainer: {
    maxParams: 1
  },
  layer: {
    maxParams: 2,
    hasDebugId: ({
      arguments: args
    }) => {
      const previousArg = args[args.length - 1];
      return types.isStringLiteral(previousArg) || types.isTemplateLiteral(previousArg);
    }
  }
};
const styleFunctions = [...Object.keys(debuggableFunctionConfig), 'globalStyle', 'createGlobalTheme', 'createThemeContract', 'globalFontFace', 'globalKeyframes', 'globalLayer', 'recipe'];
const extractName = node => {
  if (types.isObjectProperty(node) && types.isIdentifier(node.key)) {
    return node.key.name;
  } else if ((types.isVariableDeclarator(node) || types.isFunctionDeclaration(node)) && types.isIdentifier(node.id)) {
    return node.id.name;
  } else if (types.isAssignmentExpression(node) && types.isIdentifier(node.left)) {
    return node.left.name;
  } else if (types.isExportDefaultDeclaration(node)) {
    return 'default';
  } else if (types.isVariableDeclarator(node) && types.isArrayPattern(node.id) && types.isIdentifier(node.id.elements[0])) {
    return node.id.elements[0].name;
  }
};
const getDebugId = path => {
  const firstRelevantParentPath = path.findParent(({
    node
  }) => !(types.isCallExpression(node) || types.isSequenceExpression(node)));
  if (!firstRelevantParentPath) {
    return;
  }

  // Special case 1: Handle `export const [themeClass, vars] = createTheme({});`
  // when it's already been compiled into one of the following forms:
  //
  // var _createTheme = createTheme({}),
  //   _createTheme2 = _slicedToArray(_createTheme, 2),
  //   themeClass = _createTheme2[0],
  //   vars = _createTheme2[1];
  if (types.isVariableDeclaration(firstRelevantParentPath.parent)) {
    if (firstRelevantParentPath.parent.declarations.length === 4) {
      const [themeDeclarator,, classNameDeclarator] = firstRelevantParentPath.parent.declarations;
      if (types.isCallExpression(themeDeclarator.init) && types.isIdentifier(themeDeclarator.init.callee, {
        name: 'createTheme'
      }) && types.isIdentifier(classNameDeclarator.id)) {
        return classNameDeclarator.id.name;
      }
    }
    // alternative compiled form:
    //
    // var ref = _slicedToArray(createTheme({}), 2);
    // export var themeClass = ref[0],
    //   vars = ref[1];
    else if (firstRelevantParentPath.parent.declarations.length === 1) {
      var _firstRelevantParentP;
      const [themeDeclarator] = firstRelevantParentPath.parent.declarations;
      const nextSibling = (_firstRelevantParentP = firstRelevantParentPath.parentPath) === null || _firstRelevantParentP === void 0 ? void 0 : _firstRelevantParentP.getNextSibling().node;
      if (types.isCallExpression(themeDeclarator.init) && types.isCallExpression(themeDeclarator.init.arguments[0]) && types.isIdentifier(themeDeclarator.init.arguments[0].callee, {
        name: 'createTheme'
      }) && types.isExportNamedDeclaration(nextSibling) && types.isVariableDeclaration(nextSibling.declaration) && types.isVariableDeclarator(nextSibling.declaration.declarations[0]) && types.isIdentifier(nextSibling.declaration.declarations[0].id)) {
        return nextSibling.declaration.declarations[0].id.name;
      }
    }
    // Special case 2: Handle `const [themeClass, vars] = createTheme({});
    //                        export { themeClass, vars };`
    // when compiled into the following:
    //
    // var ref = _slicedToArray(createTheme({}), 2),
    //   myThemeClass = ref[0],
    //   vars = ref[1];
    // export { themeClass, vars };
    else if (firstRelevantParentPath.parent.declarations.length === 3) {
      const [themeDeclarator, classNameDeclarator] = firstRelevantParentPath.parent.declarations;
      if (types.isCallExpression(themeDeclarator.init) && types.isCallExpression(themeDeclarator.init.arguments[0]) && types.isIdentifier(themeDeclarator.init.arguments[0].callee, {
        name: 'createTheme'
      }) && types.isIdentifier(classNameDeclarator.id)) {
        return classNameDeclarator.id.name;
      }
    }
  }
  const relevantParent = firstRelevantParentPath.node;
  if (types.isObjectProperty(relevantParent) || types.isReturnStatement(relevantParent) || types.isArrowFunctionExpression(relevantParent) || types.isArrayExpression(relevantParent) || types.isSpreadElement(relevantParent)) {
    const names = [];
    path.findParent(({
      node
    }) => {
      const name = extractName(node);
      if (name) {
        names.unshift(name);
      }
      // Traverse all the way to the root
      return false;
    });
    return names.join('_');
  } else {
    return extractName(relevantParent);
  }
};
const getRelevantCall = (node, namespaceImport, importIdentifiers) => {
  const {
    callee
  } = node;
  if (namespaceImport && types.isMemberExpression(callee) && types.isIdentifier(callee.object, {
    name: namespaceImport
  })) {
    return styleFunctions.find(exportName => types.isIdentifier(callee.property, {
      name: exportName
    }));
  } else {
    const importInfo = Array.from(importIdentifiers.entries()).find(([identifier]) => types.isIdentifier(callee, {
      name: identifier
    }));
    if (importInfo) {
      return importInfo[1];
    }
  }
};
function index () {
  return {
    pre() {
      this.importIdentifiers = new Map();
      this.namespaceImport = '';
    },
    visitor: {
      ImportDeclaration(path) {
        if (packageIdentifiers.has(path.node.source.value)) {
          path.node.specifiers.forEach(specifier => {
            if (types.isImportNamespaceSpecifier(specifier)) {
              this.namespaceImport = specifier.local.name;
            } else if (types.isImportSpecifier(specifier)) {
              const {
                imported,
                local
              } = specifier;
              const importName = types.isIdentifier(imported) ? imported.name : imported.value;
              if (styleFunctions.includes(importName)) {
                this.importIdentifiers.set(local.name, importName);
              }
            }
          });
        }
      },
      CallExpression(path) {
        const {
          node
        } = path;
        const usedExport = getRelevantCall(node, this.namespaceImport, this.importIdentifiers);
        if (usedExport && usedExport in debuggableFunctionConfig) {
          const {
            maxParams,
            hasDebugId
          } = debuggableFunctionConfig[usedExport];
          if (node.arguments.length < maxParams && !(hasDebugId !== null && hasDebugId !== void 0 && hasDebugId(node))) {
            const debugIdent = getDebugId(path);
            if (debugIdent) {
              node.arguments.push(types.stringLiteral(debugIdent));
            }
          }
        }
      }
    }
  };
}

export { index as default };
