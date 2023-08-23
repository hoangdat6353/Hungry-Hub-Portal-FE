### Technology
- [React](https://react.dev/)
- [React Redux](https://react-redux.js.org/)
- [React Toolkit](https://redux-toolkit.js.org/)
- [Styled Component](https://styled-components.com/)

#### Requirements
- [Node.js](https://nodejs.org/en/) version _>=16.0.0_
- [yarn](https://yarnpkg.com/)
- [git](https://git-scm.com/)

#### VSCode Extension
- [vscode-styled-components] (https://marketplace.visualstudio.com/items?itemName=styled-components.vscode-styled-components)

#### Start
Development mode
```
yarn install && yarn start
```

Production mode
```
yarn install && yarn build
```

#### How to analyze the bundle size
```
yarn install && yarn build --stats
```

And then use the [webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer) to open _build/bundle-stats.json_.