"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const tasks_1 = require("@angular-devkit/schematics/tasks");
const config_1 = require("@schematics/angular/utility/config");
const path = require("path");
/** Entry point for `ng update` from Angular CLI. */
function default_1() {
    return (tree, context) => {
        const allTsConfigPaths = getTsConfigPaths(tree);
        const tslintFixTasks = [];
        if (!allTsConfigPaths.length) {
            throw new Error('Could not find any tsconfig file. Please submit an issue on the Angular ' +
                'Material repository that includes the name of your TypeScript configuration.');
        }
        for (const tsconfig of allTsConfigPaths) {
            // Run the update tslint rules.
            tslintFixTasks.push(context.addTask(new tasks_1.TslintFixTask({
                rulesDirectory: [
                    path.join(__dirname, 'rules/'),
                    path.join(__dirname, 'rules/attribute-selectors'),
                    path.join(__dirname, 'rules/class-names'),
                    path.join(__dirname, 'rules/class-inheritance'),
                    path.join(__dirname, 'rules/input-names'),
                    path.join(__dirname, 'rules/output-names'),
                    path.join(__dirname, 'rules/css-selectors'),
                    path.join(__dirname, 'rules/element-selectors'),
                    path.join(__dirname, 'rules/property-names'),
                    path.join(__dirname, 'rules/method-calls'),
                ],
                rules: {
                    // Attribute selector update rules.
                    'attribute-selectors-string-literal': true,
                    'attribute-selectors-stylesheet': true,
                    'attribute-selectors-template': true,
                    // Class name update rules
                    'class-names-identifier': true,
                    'class-names-identifier-misc': true,
                    // CSS selectors update rules
                    'css-selectors-string-literal': true,
                    'css-selectors-stylesheet': true,
                    'css-selectors-template': true,
                    // Element selector update rules
                    'element-selectors-string-literal': true,
                    'element-selectors-stylesheet': true,
                    'element-selectors-template': true,
                    // Input name update rules
                    'input-names-stylesheet': true,
                    'input-names-template': true,
                    // Output name update rules
                    'output-names-template': true,
                    // Property name update rules
                    'property-names-access': true,
                    'property-names-misc': true,
                    // Method call checks
                    'method-calls-check': true,
                    // Class inheritance
                    'class-inheritance-check': true,
                    'class-inheritance-misc': true,
                    // Additional misc rules.
                    'check-import-misc': true,
                    'check-template-misc': true
                }
            }, {
                silent: false,
                ignoreErrors: true,
                tsConfigPath: tsconfig,
            })));
        }
        // Delete the temporary schematics directory.
        context.addTask(new tasks_1.RunSchematicTask('ng-post-update', {}), tslintFixTasks);
    };
}
exports.default = default_1;
/** Post-update schematic to be called when update is finished. */
function postUpdate() {
    return () => console.log('\nComplete! Please check the output above for any issues that were detected but could not' +
        ' be automatically fixed.');
}
exports.postUpdate = postUpdate;
/**
 * Gets all tsconfig paths from a CLI project by reading the workspace configuration
 * and looking for common tsconfig locations.
 */
function getTsConfigPaths(tree) {
    // Start with some tsconfig paths that are generally used.
    const tsconfigPaths = [
        './tsconfig.json',
        './src/tsconfig.json',
        './src/tsconfig.app.json',
    ];
    // Add any tsconfig directly referenced in a build or test task of the angular.json workspace.
    const workspace = config_1.getWorkspace(tree);
    for (const project of Object.values(workspace.projects)) {
        if (project && project.architect) {
            for (const taskName of ['build', 'test']) {
                const task = project.architect[taskName];
                if (task && task.options && task.options.tsConfig) {
                    const tsConfigOption = task.options.tsConfig;
                    if (typeof tsConfigOption === 'string') {
                        tsconfigPaths.push(tsConfigOption);
                    }
                    else if (Array.isArray(tsConfigOption)) {
                        tsconfigPaths.push(...tsConfigOption);
                    }
                }
            }
        }
    }
    // Filter out tsconfig files that don't exist and remove any duplicates.
    return tsconfigPaths
        .filter(p => tree.exists(p))
        .filter((value, index, self) => self.indexOf(value) === index);
}
//# sourceMappingURL=update.js.map