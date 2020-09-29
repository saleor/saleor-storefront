const { readdirSync } = require("fs");

const getDirectories = source =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => {
      return { name: dirent.name, value: dirent.name };
    });
module.exports = plop => {
  plop.setGenerator("component", {
    description: "Create a component",
    prompts: [
      {
        type: "list",
        name: "componentType",
        message: "Choose component type",
        choices: getDirectories("src/@next/components"),
      },
      {
        type: "input",
        name: "name",
        message: "Enter component name",
      },
    ],
    actions: data => {
      const path = `src/@next/components/${data.componentType}/`;
      return [
        {
          type: "add",
          path: `${path}{{pascalCase name}}/{{pascalCase name}}.tsx`,
          templateFile: "plop-templates/Component/Component.tsx.hbs",
        },
        {
          type: "add",
          path: `${path}{{pascalCase name}}/index.tsx`,
          templateFile: "plop-templates/Component/index.ts.hbs",
        },
        {
          type: "add",
          path: `${path}{{pascalCase name}}/stories.tsx`,
          templateFile: "plop-templates/Component/stories.tsx.hbs",
        },
        {
          type: "append",
          path: `${path}index.ts`,
          separator: "",
          templateFile: "plop-templates/Component/exportAll.ts.hbs",
        },
      ];
    },
  });
};
