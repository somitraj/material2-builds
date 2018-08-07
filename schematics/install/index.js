"use strict";
/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
Object.defineProperty(exports, "__esModule", { value: true });
const schematics_1 = require("@angular-devkit/schematics");
const tasks_1 = require("@angular-devkit/schematics/tasks");
const change_1 = require("@schematics/angular/utility/change");
const config_1 = require("@schematics/angular/utility/config");
const version_names_1 = require("./version-names");
const ast_1 = require("../utils/ast");
const get_project_1 = require("../utils/get-project");
const html_1 = require("../utils/html");
const package_1 = require("../utils/package");
const theming_1 = require("./theming");
const parse5 = require("parse5");
/**
 * Scaffolds the basics of a Angular Material application, this includes:
 *  - Add Packages to package.json
 *  - Adds pre-built themes to styles.ext
 *  - Adds Browser Animation to app.module
 */
function default_1(options) {
    if (!parse5) {
        throw new schematics_1.SchematicsException('Parse5 is required but could not be found! Please install ' +
            '"parse5" manually in order to continue.');
    }
    return schematics_1.chain([
        options && options.skipPackageJson ? schematics_1.noop() : addMaterialToPackageJson(),
        theming_1.addThemeToAppStyles(options),
        addAnimationRootConfig(options),
        addFontsToIndex(options),
        addBodyMarginToStyles(options),
    ]);
}
exports.default = default_1;
/** Add material, cdk, animations to package.json if not already present. */
function addMaterialToPackageJson() {
    return (host, context) => {
        // Version tag of the `@angular/core` dependency that has been loaded from the `package.json`
        // of the CLI project. This tag should be preferred because all Angular dependencies should
        // have the same version tag if possible.
        const ngCoreVersionTag = package_1.getPackageVersionFromPackageJson(host, '@angular/core');
        package_1.addPackageToPackageJson(host, 'dependencies', '@angular/cdk', version_names_1.materialVersion);
        package_1.addPackageToPackageJson(host, 'dependencies', '@angular/material', version_names_1.materialVersion);
        package_1.addPackageToPackageJson(host, 'dependencies', '@angular/animations', ngCoreVersionTag || version_names_1.requiredAngularVersion);
        context.addTask(new tasks_1.NodePackageInstallTask());
        return host;
    };
}
/** Add browser animation module to app.module */
function addAnimationRootConfig(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = get_project_1.getProjectFromWorkspace(workspace, options.project);
        ast_1.addModuleImportToRootModule(host, 'BrowserAnimationsModule', '@angular/platform-browser/animations', project);
        return host;
    };
}
/** Adds fonts to the index.ext file */
function addFontsToIndex(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = get_project_1.getProjectFromWorkspace(workspace, options.project);
        const fonts = [
            'https://fonts.googleapis.com/css?family=Roboto:300,400,500',
            'https://fonts.googleapis.com/icon?family=Material+Icons',
        ];
        fonts.forEach(f => html_1.addHeadLink(host, project, `\n<link href="${f}" rel="stylesheet">`));
        return host;
    };
}
/** Add 0 margin to body in styles.ext */
function addBodyMarginToStyles(options) {
    return (host) => {
        const workspace = config_1.getWorkspace(host);
        const project = get_project_1.getProjectFromWorkspace(workspace, options.project);
        const stylesPath = ast_1.getStylesPath(project);
        const buffer = host.read(stylesPath);
        if (buffer) {
            const src = buffer.toString();
            const insertion = new change_1.InsertChange(stylesPath, src.length, `\nhtml, body { height: 100%; }\nbody { margin: 0; font-family: 'Roboto', sans-serif; }\n`);
            const recorder = host.beginUpdate(stylesPath);
            recorder.insertLeft(insertion.pos, insertion.toAdd);
            host.commitUpdate(recorder);
        }
        else {
            console.warn(`Skipped body reset; could not find file: ${stylesPath}`);
        }
    };
}
//# sourceMappingURL=index.js.map